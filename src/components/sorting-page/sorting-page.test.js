import { render, screen, fireEvent } from "@testing-library/react";
import { SortingPage } from "./sorting-page";
import { BrowserRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import { DELAY_IN_MS } from "../../constants/delays";

describe("Sorting Page", () => {
  it("Empty array", () => {
    render(
      <BrowserRouter>
        <SortingPage arrLength={0} />
      </BrowserRouter>
    );

    const array = screen.getByTestId("array-container");
    expect(array).toBeEmptyDOMElement();
  });

  it("Array with one number", () => {
    render(
      <BrowserRouter>
        <SortingPage arrLength={1} />
      </BrowserRouter>
    );

    const array = screen.getByTestId("array-container");
    expect(array.childNodes.length).toBe(1);
  });

  it("Array with numbers ascending sort", async () => {
    render(
      <BrowserRouter>
        <SortingPage arrLength={3} />
      </BrowserRouter>
    );

    const arr = screen
      .queryAllByTestId("column")
      .map((item) => item.textContent);
    const sortedArr = arr.sort((a, b) => a - b);

    const buttonElement = screen.getByTestId("button_ascending");
    fireEvent.click(buttonElement);

    await waitFor(
      () => {
        const newArr = screen
          .queryAllByTestId("column")
          .map((item) => item.textContent);
        expect(newArr).toStrictEqual(sortedArr);
      },
      { timeout: DELAY_IN_MS * 2 }
    );
  });

  it("Array with numbers descending sort", async () => {
    render(
      <BrowserRouter>
        <SortingPage arrLength={3} />
      </BrowserRouter>
    );

    const arr = screen
      .queryAllByTestId("column")
      .map((item) => item.textContent);
    const sortedArr = arr.sort((a, b) => b - a);

    const buttonElement = screen.getByTestId("button_descending");
    fireEvent.click(buttonElement);

    await waitFor(
      () => {
        const newArr = screen
          .queryAllByTestId("column")
          .map((item) => item.textContent);
        expect(newArr).toStrictEqual(sortedArr);
      },
      { timeout: DELAY_IN_MS * 2 }
    );
  });
});
