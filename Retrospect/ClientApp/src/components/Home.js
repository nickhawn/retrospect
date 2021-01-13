import React, { useState } from "react";
import Prompts from "./Prompts";
import FeedbackContext from "../contexts/FeedbackContext";


export default function Home() {
    const [feedback, setFeedback] = useState([]);

    return (
        <FeedbackContext.Provider value={[feedback, setFeedback]}>
            <h1 data-testid="welcome-message" className="text-center">
                Retrospect
            </h1>
            <Prompts />
        </FeedbackContext.Provider>
    );
}