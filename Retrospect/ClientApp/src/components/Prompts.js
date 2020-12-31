import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import Feedback from "./Feedback";
import { getFeedback } from "../services/apiService";

export default function Prompts() {
    const [didWellFeedback, setDidWellFeedback] = useState([]);
    const [needsImprovedFeedback, setNeedsImprovedFeedback] = useState([]);
    const [willImproveFeedback, setWillImproveFeedback] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let feedback = await getFeedback()
            setDidWellFeedback(feedback.filter(f => f.type === 0))
            setNeedsImprovedFeedback(feedback.filter(f => f.type === 1))
            setWillImproveFeedback(feedback.filter(f => f.type === 2))
        }
        fetchData()
    }, []);

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
