import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn file input", () => {
  render(<App />);
  const linkElement = screen.getByText(/Select JSON File/i);
  expect(linkElement).toBeInTheDocument();
});
