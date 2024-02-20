import { Button } from "./button";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

it("The button without text is rendered without errors", () => {
  const buttonWithoutText = renderer.create(<Button />);
  expect(buttonWithoutText).toMatchSnapshot();
});

it("The button with text is rendered without errors", () => {
  const buttonWithText = renderer.create(<Button text="test" />);
  expect(buttonWithText).toMatchSnapshot();
});

it("The locked button is rendered without errors", () => {
  const buttonDisabled = renderer.create(<Button disabled={true} />);
  expect(buttonDisabled).toMatchSnapshot();
});

it("The button with load indication is rendered without errors", () => {
  const buttonIsLoader = renderer.create(<Button isLoader={true} />);
  expect(buttonIsLoader).toMatchSnapshot();
});

it("Callback is working correctly", () => {
  const onClick = jest.fn();
  render(<Button text="test button" onClick={onClick} />);
  const button = screen.getByText("test button");
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});
