import "@testing-library/jest-dom";
import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("should display Start button", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
});
