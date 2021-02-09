import React, { useState } from "react";
import Prompts from "./Prompts";
import FeedbackContext from "../contexts/FeedbackContext";
import CountdownTimer from './CountdownTimer';


export default function Home() {
    const [feedback, setFeedback] = useState([]);

    return (
        <FeedbackContext.Provider value={[feedback, setFeedback]}>
            <h1 data-testid="welcome-message" className="text-center">
                Retrospect
            </h1>
            <CountdownTimer />
            <Prompts />
        </FeedbackContext.Provider>
    );
}