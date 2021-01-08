import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import Feedback from "./Feedback";
import { getFeedback } from "../services/apiService";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export default function Prompts() {
    const [connection, setConnection] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [didWellFeedback, setDidWellFeedback] = useState([]);
    const [needsImprovedFeedback, setNeedsImprovedFeedback] = useState([]);
    const [willImproveFeedback, setWillImproveFeedback] = useState([]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .configureLogging(LogLevel.None)
            .withUrl('https://localhost:44397/hubs/feedback')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        updateFeedback()
    }, []);

    useEffect(() => {
        setDidWellFeedback(feedback.filter(f => f.type === 0))
        setNeedsImprovedFeedback(feedback.filter(f => f.type === 1))
        setWillImproveFeedback(feedback.filter(f => f.type === 2))
    }, [feedback]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    connection.on('ReceiveFeedback', newFeedback => {
                        setFeedback(feedback => [...feedback, newFeedback]);
                    });
                    connection.on('DeleteFeedback', () => {
                        updateFeedback()
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const updateFeedback = async () => {
        setFeedback(await getFeedback())
    }

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
