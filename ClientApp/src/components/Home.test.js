import React from "react";
import { render, queryByTestId } from "@testing-library/react";
import Home from "./Home";

it("Displays hello message", () => {
  const { container } = render(<Home />);

  const checkContent = queryByTestId(container, "welcome-message");

  expect(checkContent.textContent).toBe("Retrospect")
});