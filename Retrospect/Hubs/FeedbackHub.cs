using System.Threading.Tasks;
using Retrospect.Data;
using Microsoft.AspNetCore.SignalR;
using Core;

namespace Retrospect.Web.Data.Hubs
{
    public class FeedbackHub : Hub<IFeedbackClient>
    {
        private readonly ICountdownCoordinator _countdownCoordinator;

        public FeedbackHub(ICountdownCoordinator countdown)
        {
            _countdownCoordinator = countdown;
        }

        public async Task SendFeedback(Feedback feedback) => await Clients.All.ReceiveFeedback(feedback);

        public async Task DeleteFeedback(Feedback feedback) => await Clients.All.DeleteFeedback(feedback);

        public async Task StartCountdown() => await Clients.All.StartCountdown(_countdownCoordinator.GetNextIteration());

    }
}