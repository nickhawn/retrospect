using System;
using System.Threading.Tasks;
using Retrospect.Data;

namespace Retrospect.Web.Data.Hubs
{
    public interface IFeedbackClient
    {
        Task ReceiveFeedback(Feedback feedback);

        Task DeleteFeedback(Feedback feedback);

        Task StartCountdown(DateTime datetime);

        Task ResetCountdown();
    }
}