import React, { Fragment, useState } from "react";
import { Form, Input, InputGroup, Button } from "reactstrap";
import { postFeedback } from "../services/apiService";
import FeedbackCard from "./FeedbackCard";

export default function Feedback({ columnName, feedback, columnIndex }) {
    const [inputValue, setInputValue] = useState("");

    const inputGroupChangeHandler = (e) => {
        e.preventDefault();
        postFeedback(inputValue, columnIndex);
        document.getElementById("feedback-form").reset();
    };

    return (
        <Fragment>
            <p className="text-center">{columnName}</p>
            <Form id="feedback-form" onSubmit={inputGroupChangeHandler}>
                <InputGroup>
                    <Input
                        type="text"
                        name={columnName}
                        id={columnName}
                        aria-label={columnName}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button onClick={inputGroupChangeHandler}>Submit</Button>
                </InputGroup>
            </Form>
            {feedback && feedback.map((feedback, i) => {
                return <FeedbackCard key={i} feedback={feedback} />
            })}
        </Fragment>
    );
}
