import React, { Fragment, useState } from "react";
import { Form, Input, InputGroup, Button } from "reactstrap";
import { postFeedback } from "../services/apiService";

export default function Columns({ columnName }) {
  const [inputValue, setInputValue] = useState("");

  const inputGroupChangeHandler = (e) => {
    e.preventDefault();
    postFeedback(inputValue);
  };

  return (
    <Fragment>
      <p className="text-center">{columnName}</p>
      <Form onSubmit={inputGroupChangeHandler}>
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
    </Fragment>
  );
}
