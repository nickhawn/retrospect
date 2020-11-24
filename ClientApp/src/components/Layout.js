import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
