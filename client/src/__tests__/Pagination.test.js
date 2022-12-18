import { render, fireEvent } from "@testing-library/react";
import Pagination from "shared/Pagination";

describe("Pagination component", () => {
  const onClick = jest.fn();

  test("should show three pagination items", () => {
    const { getAllByText } = render(
      <Pagination numberOfPages={3} onClick={onClick} />
    );

    expect(getAllByText(/[1-9]/i)).toHaveLength(3);
  });

  test("selected pagination item should have gray background", () => {
    const { queryByText } = render(
      <Pagination numberOfPages={3} onClick={onClick} />
    );

    expect(queryByText("1").className.includes("bg-gray-200")).toBeTruthy();

    expect(queryByText("2").className.includes("bg-white")).toBeTruthy();

    // change page
    fireEvent.click(queryByText("2"));

    expect(onClick).toHaveBeenCalled();

    expect(queryByText("1").className.includes("bg-white")).toBeTruthy();

    expect(queryByText("2").className.includes("bg-gray-200")).toBeTruthy();
  });
});
