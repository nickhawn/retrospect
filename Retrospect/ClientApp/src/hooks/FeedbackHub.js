import { HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr"
import { useContext } from "react"
import CountdownContext from "../contexts/CountdownContext"
import FeedbackContext from "../contexts/FeedbackContext"
import { getFeedback } from "../services/apiService"
import dayjs from '../services/datejsProvider'

let _hub;

export function useHub() {
    const [feedback, setFeedback] = useContext(FeedbackContext)
    const [countdown, setCountdown] = useContext(CountdownContext)

    function startCountdown() {
        if (_hub.connectionState === HubConnectionState.Connected)
            return _hub.invoke("StartCountdown")
    }

    function resetCountdown() {
        if (_hub.connectionState === HubConnectionState.Connected)
            return _hub.invoke("ResetCountdown")
    }

    return {
        buildHub,
        startConnection,
        feedback,
        countdown,
        updateFeedback,
        startCountdown,
        resetCountdown
    }

    async function buildHub() {
        _hub = build();
        handleCloseConnection(_hub);
        handleError(_hub);
        handleNewFeedback(_hub);
        handleDeleteFeedback(_hub);
        handleCountdownStart(_hub);
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
            setFeedback(feedback => feedback.filter(f => f.id !== feedbackToDelete.id))
        });
    }

    function handleCountdownStart(hub) {
        hub.on('StartCountdown', timer => {
            setCountdown(Math.abs(dayjs.utc().diff(timer)))
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