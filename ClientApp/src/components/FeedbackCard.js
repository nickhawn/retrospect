import React from "react";
import { Card, CardBody, CardText } from "reactstrap";

export default function FeedbackCard() {
  return (
    <Card>
      <CardBody>
        <CardText className="text-center">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </CardText>
      </CardBody>
    </Card>
  );
}
