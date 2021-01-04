using System.Threading.Tasks;
using Retrospect.Data;

namespace Retrospect.Web.Data.Hubs
{
    public interface IFeedbackClient
    {
        Task ReceiveFeedback(Feedback feedback);
    }
}