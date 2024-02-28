import { Circle } from "./circle";
import React from "react";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

it("The circle without letter is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(<Circle />);
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The circle with letter is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(<Circle letter="T" />);
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The circle with head is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(<Circle head="head" />);
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The circle with react-element in head is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(<Circle head={<Circle />} />);
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The circle with tail is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(<Circle tail="tail" />);
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The circle with react-element in tail is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(<Circle tail={<Circle />} />);
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The circle with index is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(<Circle index={1} />);
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The circle with prop isSmall is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(<Circle isSmall={true} />);
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The default circle is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(
    <Circle state={ElementStates.Default} />
  );
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The changing circle is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(
    <Circle state={ElementStates.Changing} />
  );
  expect(circleWithoutLetter).toMatchSnapshot();
});

it("The modified circle is rendered without errors", () => {
  const circleWithoutLetter = renderer.create(
    <Circle state={ElementStates.Modified} />
  );
  expect(circleWithoutLetter).toMatchSnapshot();
});
