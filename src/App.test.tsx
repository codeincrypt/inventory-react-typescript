import React from "react"
import { render, screen } from "@testing-library/react";
import App from "./App";

test("find text in project", () => {
  render(<App />);
  const linkElement = screen.getByText(/total invoices/i);
  expect(linkElement).toBeInTheDocument()
})

test('renders with no invoices', () => {
  render(<App />);
  const textElements = screen.getAllByText(/New Invoice/i) 
  textElements.forEach(textElement => {
    expect(textElement).toBeInTheDocument();
  });
});

test('renders with invoices', () => {
  render(<App />);
  const textElement = screen.getByText(/There are \d+ total invoices/i) 
  expect(textElement).toBeInTheDocument();
});