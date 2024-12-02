import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("should not throw", () => {
  render(<App />);
  expect(screen.getByLabelText("Start")).toBeInTheDocument();
});
