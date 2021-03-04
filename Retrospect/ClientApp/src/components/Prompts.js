import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useHub } from "../hooks/FeedbackHub";
import Feedback from "./Feedback";

export default function Prompts() {
    const [didWellFeedback, setDidWellFeedback] = useState([]);
    const [needsImprovedFeedback, setNeedsImprovedFeedback] = useState([]);
    const [willImproveFeedback, setWillImproveFeedback] = useState([]);

    const {
        startConnection,
        buildHub,
        feedback,
        updateFeedback
    } = useHub();

    useEffect(() => {
        buildHub();
        startConnection();
        updateFeedback();
    }, []);

    useEffect(() => {
        setDidWellFeedback(feedback.filter(f => f.type === 0))
        setNeedsImprovedFeedback(feedback.filter(f => f.type === 1))
        setWillImproveFeedback(feedback.filter(f => f.type === 2))
    }, [feedback]);

    return (
        <Row className="mt-5">
            <Col>
                <Feedback columnIndex={0} columnName="What worked well?" feedback={didWellFeedback} />
            </Col>
            <Col>
                <Feedback columnIndex={1} columnName="What could be improved?" feedback={needsImprovedFeedback} />
            </Col>
            <Col>
                <Feedback columnIndex={2} columnName="What will we improve in the next Sprint?" feedback={willImproveFeedback} />
            </Col>
        </Row>
    );
}
