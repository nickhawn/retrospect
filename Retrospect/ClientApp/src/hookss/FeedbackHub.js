import { HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { useContext } from "react";
import FeedbackContext from "../contexts/FeedbackContext";
import { getFeedback } from "../services/apiService";

let _hub;

export function useHub() {
    const [feedback, setFeedback] = useContext(FeedbackContext);

    return {
        buildHub,
        startConnection,
        feedback,
        updateFeedback
    }

    async function buildHub() {
        _hub = build();
        handleCloseConnection(_hub);
        handleError(_hub);
        handleNewFeedback(_hub);
        handleDeleteFeedback(_hub);
    }

    function build() {
        return new HubConnectionBuilder()
            .configureLogging(LogLevel.None)
            .withUrl('https://localhost:44397/hubs/feedback')
            .withAutomaticReconnect()
            .build();
    }

    function startConnection() {
        if (_hub.connectionState !== HubConnectionState.Connected)
            return _hub.start()
                .catch(() => {
                    console.log("Error")
                });
    }

    function handleCloseConnection(hub) {
        hub.onclose(async () => {
            await startConnection(hub);
        });
    }

    function handleNewFeedback(hub) {
        hub.on("ReceiveFeedback", (newFeedback) => {
            setFeedback(feedback => [...feedback, newFeedback]);
        });
    }

    function handleDeleteFeedback(hub) {
        hub.on('DeleteFeedback', feedbackToDelete => {
            setFeedback(feedback => feedback.filter(f => f.id != feedbackToDelete.id))
        });
    }

    async function updateFeedback(hub) {
        setFeedback(await getFeedback())
    }

    function handleError(hub) {
        hub.on("Error", () => {
            alert("An error has occured.")
        });
    }
}