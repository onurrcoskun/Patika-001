import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./Header";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


test("Uygulama bilesen testi", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});


test("Baslık bilesen testi", () => {
  const div2 = document.createElement("div");
  ReactDOM.render(<Header />, div2);
});

test("Emoji render testi", () => {
  render(<App />);
  const emojiListContainer = screen.getByTestId("all-emojis");
  expect(emojiListContainer.childNodes.length === 20);
});


test("Emoji kopyalama testi", () => {
  render(<App />);
  const inputElement = document.getElementsByTagName("input");
  userEvent.type(inputElement[0], "Cricket");
  expect(screen.getByText("Cricket"));
});


test("Check copy of emoji property", () => {
  render(<App />);
  const clickedItem = screen.getByTestId("all-emojis");
  userEvent.click(clickedItem);
});
