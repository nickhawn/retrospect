using Microsoft.AspNetCore.Mvc;
using retrospect.Models;

namespace retrospect.Controllers
{
    public class FeedbackController
    {
        [HttpPost("feedback")]
        public string Post([FromBody] Feedback feedback) => feedback.Content;
    }
}