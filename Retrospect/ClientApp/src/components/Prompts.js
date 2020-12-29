import React from "react";
import { Col, Row } from "reactstrap";
import Column from "./Feedback";

export default function Prompts() {
  return (
    <Row className="mt-5">
      <Col>
        <Column columnName="What worked well?" />
      </Col>
      <Col>
        <Column columnName="What could be improved?" />
      </Col>
      <Col>
        <Column columnName="What will we improve in the next Sprint?" />
      </Col>
    </Row>
  );
}
