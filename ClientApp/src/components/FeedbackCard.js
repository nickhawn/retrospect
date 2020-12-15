import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import Trashcan from './Trashcan';

export default function FeedbackCard({ feedback }) {
    return (
        <Card className="mt-3">
            <CardBody>
                <CardText className="text-center">
                    {feedback.content}
                </CardText>
                <Trashcan itemId={feedback.id} />
            </CardBody>
        </Card>
    );
}