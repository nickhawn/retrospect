import React, { useState } from "react";
import Prompts from "./Prompts";
import FeedbackContext from "../contexts/FeedbackContext";
import CountdownContext from "../contexts/CountdownContext";
import CountdownTimer from './CountdownTimer';

export default function Home() {
    const [feedback, setFeedback] = useState([]);
    const [countdown, setCountdown] = useState(0);

    return (
        <>
            <h1 data-testid="welcome-message" className="text-center">
                Retrospect
            </h1>
            <FeedbackContext.Provider value={[feedback, setFeedback]}>
                <CountdownContext.Provider value={[countdown, setCountdown]}>
                    <CountdownTimer />
                    <Prompts />
                </CountdownContext.Provider>
            </FeedbackContext.Provider>
        </>
    );
}