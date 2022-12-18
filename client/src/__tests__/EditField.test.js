import { render, fireEvent, wait } from "@testing-library/react";
import EditField from "shared/EditField";
import { act } from "react-dom/test-utils";

describe("EditField component", () => {
  test("should render component", () => {
    const { container } = render(<EditField field="email" />);

    expect(container).not.toBeNull();
  });

  test("should show confirmation field if confirmation prop is true", () => {
    const { getByText, getByLabelText } = render(
      <EditField field="email" confirmation={true} />
    );

    // click on 'update your email'
    fireEvent.click(getByText(/update/i));

    expect(getByLabelText(/new/i)).not.toBeNull();
    expect(getByLabelText(/confirm/i)).not.toBeNull();
  });

  test("should call onSubmit, cancel edit mode after submission", async () => {
    const email = "johnny@gmail.com";
    const onSubmit = jest.fn();

    const { getByText, getByLabelText, queryByLabelText } = render(
      <EditField field="email" confirmation={true} onSubmit={onSubmit} />
    );

    // click on 'update your email'
    fireEvent.click(getByText(/update/i));

    const newEmailInput = getByLabelText(/new/i);
    const confirmEmailInput = getByLabelText(/confirm/i);

    expect(newEmailInput).not.toBeNull();
    expect(confirmEmailInput).not.toBeNull();

    fireEvent.change(newEmailInput, { target: { value: email } });
    fireEvent.change(confirmEmailInput, { target: { value: email } });

    expect(newEmailInput.value).toBe(email);
    expect(confirmEmailInput.value).toBe(email);

    act(() => {
      fireEvent.click(getByText("Save"));
    });

    await wait();

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledTimes(1);

    // edit mode off
    expect(queryByLabelText(/new/i)).toBeNull();
    expect(queryByLabelText(/confirm/i)).toBeNull();
  });
});
