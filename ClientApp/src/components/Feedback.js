import React, { Fragment, useState, useEffect } from "react";
import { Form, Input, InputGroup, Button } from "reactstrap";
import { postFeedback, getFeedback } from "../services/apiService";
import FeedbackCard from "./FeedbackCard";

export default function Columns({ columnName }) {
    const [inputValue, setInputValue] = useState("");
    const [feedback, setFeedback] = useState([]);

  const inputGroupChangeHandler = (e) => {
    e.preventDefault();
    postFeedback(inputValue);
    };

    useEffect(() => {
        async function fetchData() {
            setFeedback((await getFeedback()))
        }
        fetchData()
    }, []);

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
          {feedback && feedback.map((team, i) => {
              return <FeedbackCard key={i} feedback={team.content} id={team.id} />
          })}
    </Fragment>
  );
}
