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
        handleUpdateFeedback(_hub);
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

    function handleUpdateFeedback(hub) {
        hub.on("ReceiveFeedback", (newFeedback) => {
            setFeedback(feedback => [...feedback, newFeedback]);
        });
    }

    function handleUpdateFeedback(hub) {
        hub.on('DeleteFeedback', () => {
            updateFeedback()
        });
    }

    async function updateFeedback() {
        setFeedback(await getFeedback())
    }

    function handleError(hub) {
        hub.on("Error", () => {
            alert("Hello! I am an alert box!!")
        });
    }
}