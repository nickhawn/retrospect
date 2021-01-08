using System.Threading.Tasks;
using Retrospect.Data;
using Microsoft.AspNetCore.SignalR;

namespace Retrospect.Web.Data.Hubs
{
    public class FeedbackHub : Hub<IFeedbackClient>
    {
        public async Task SendFeedback(Feedback feedback) => await Clients.All.ReceiveFeedback(feedback);

        public async Task DeleteFeedback() => await Clients.All.DeleteFeedback();

        public async Task UpdateFeedback(Feedback feedback) => await Clients.All.UpdateFeedback(feedback);
    }
}