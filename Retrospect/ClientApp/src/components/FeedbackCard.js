import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import Trashcan from './Trashcan';
import Vote from './Vote'

export default function FeedbackCard({ feedback }) {
    return (
        <Card className="mt-3">
            <CardBody>
                <Vote votes={feedback.votes} id={feedback.id} />
                <CardText className="text-center">
                    {feedback.content}
                </CardText>
                <Trashcan itemId={feedback.id} />
            </CardBody>
        </Card>
    );
}