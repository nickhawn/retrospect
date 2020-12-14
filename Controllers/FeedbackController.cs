using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using retrospect.Models;

namespace retrospect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly RetrospectContext _context;

        public FeedbackController(RetrospectContext context) => _context = context;

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

            return CreatedAtAction("GetFeedback", new { id = feedback.Id }, feedback);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(Guid id)
        {
            var feedback = await _context.Feedback.FindAsync(id);
            if (feedback == null)
                return NotFound();

            _context.Feedback.Remove(feedback);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
