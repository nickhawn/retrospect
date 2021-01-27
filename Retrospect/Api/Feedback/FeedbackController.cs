using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Retrospect.EntityFramework.Data;
using Retrospect.Data;
using Retrospect.Web.Data.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Retrospect.Web.Data
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly RetrospectContext _context;
        IHubContext<FeedbackHub, IFeedbackClient> _feedbackHubContext;

        public FeedbackController(RetrospectContext context, IHubContext<FeedbackHub, IFeedbackClient> feedbackHub)
        {
            _context = context;
            _feedbackHubContext = feedbackHub;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedback() => await _context.Feedback.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedback(Guid id)
        {
            var feedback = await _context.Feedback.FindAsync(id);
            return feedback == null ? NotFound() : (ActionResult<Feedback>)feedback;
        }

        [HttpPost]
        public async Task<ActionResult<Feedback>> PostFeedback(Feedback feedback)
        {
            _context.Feedback.Add(feedback);
            await _context.SaveChangesAsync();
            await _feedbackHubContext.Clients.All.ReceiveFeedback(feedback);

            return CreatedAtAction("GetFeedback", new { id = feedback.Id }, feedback);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(Guid id)
        {
            var feedback = await _context.Feedback.FindAsync(id);
            if (feedback == null)
                return NotFound();

            await _feedbackHubContext.Clients.All.DeleteFeedback(feedback);
            _context.Feedback.Remove(feedback);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
