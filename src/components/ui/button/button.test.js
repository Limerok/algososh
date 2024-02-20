import { Button } from "./button";
import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

it("Кнопка без текста рендерится без ошибок", () => {
  const buttonWithoutText = renderer.create(<Button />);
  expect(buttonWithoutText).toMatchSnapshot();
});

it("Кнопка c текстом рендерится без ошибок", () => {
  const buttonWithText = renderer.create(<Button text="test" />);
  expect(buttonWithText).toMatchSnapshot();
});

it("Заблокированная кнопка рендерится без ошибок", () => {
  const buttonDisabled = renderer.create(<Button disabled={true} />);
  expect(buttonDisabled).toMatchSnapshot();
});

it("Kнопкa с индикацией загрузки рендерится без ошибок", () => {
  const buttonIsLoader = renderer.create(<Button isLoader={true} />);
  expect(buttonIsLoader).toMatchSnapshot();
});

it("Колбек работает корректно", () => {
  const onClick = jest.fn();
  render(<Button text="test button" onClick={onClick} />);
  const button = screen.getByText("test button");
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});
