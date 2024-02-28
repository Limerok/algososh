import { Button } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

it("The button without text is rendered without errors", () => {
  const buttonWithoutText = renderer.create(<Button text="" linkedList="" />);
  expect(buttonWithoutText).toMatchSnapshot();
});

it("The button with text is rendered without errors", () => {
  const buttonWithText = renderer.create(<Button text="test" linkedList="" />);
  expect(buttonWithText).toMatchSnapshot();
});

it("The locked button is rendered without errors", () => {
  const buttonDisabled = renderer.create(
    <Button text="test" disabled={true} linkedList="" />
  );
  expect(buttonDisabled).toMatchSnapshot();
});

it("The button with load indication is rendered without errors", () => {
  const buttonIsLoader = renderer.create(
    <Button text="test" isLoader={true} linkedList="" />
  );
  expect(buttonIsLoader).toMatchSnapshot();
});

it("Callback is working correctly", () => {
  const onClick = jest.fn();
  render(<Button text="test button" linkedList="" onClick={onClick} />);
  const button = screen.getByText("test button");
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});
