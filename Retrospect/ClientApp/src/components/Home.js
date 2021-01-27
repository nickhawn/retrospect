import React, { Fragment } from "react";
import Prompts from "./Prompts";

export default function Home() {
  return (
    <Fragment>
      <h1 data-testid="welcome-message" className="text-center">
        Retrospect
      </h1>
      <Prompts />
    </Fragment>
  );
}