import React from "react";
import { Card, CardBody, CardText } from "reactstrap";
import Trashcan from './Trashcan';

export default function FeedbackCard({ feedback, id }) {
    return (
        <Card>
            <CardBody>
                <CardText className="text-center">
                    {feedback}
                </CardText>
                <Trashcan itemId={id} />
            </CardBody>
        </Card>
    );
}