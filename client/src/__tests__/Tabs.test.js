import { render, fireEvent } from "@testing-library/react";

import Tabs from "shared/Tabs";
import Tab from "shared/Tabs/Tab";

describe("Tabs component", () => {
  const FIRST_TAB_CONTENT = "first tab content";
  const SECOND_TAB_CONTENT = "second tab content";

  const FIRST_TITLE = "first";
  const SECOND_TITLE = "second";

  test("should display two tabs if passed", async () => {
    const { queryByTestId } = render(
      <Tabs>
        <Tab>{FIRST_TAB_CONTENT}</Tab>
        <Tab>{SECOND_TAB_CONTENT}</Tab>
      </Tabs>
    );

    const tabsContainer = queryByTestId("tabs");

    expect(tabsContainer).not.toBeNull();
    expect(tabsContainer.firstChild.childNodes).toHaveLength(2);
  });

  test("shouldn't display tabs div if any child is not 'Tab' component", async () => {
    const { queryByTestId } = render(
      <Tabs>
        <Tab>Hello world</Tab>
        <h1>hello world</h1>
      </Tabs>
    );

    expect(queryByTestId("tabs")).toBeNull();
  });

  test("should see first tab content initially", async () => {
    const { queryByText } = render(
      <Tabs>
        <Tab title="first">{FIRST_TAB_CONTENT}</Tab>
        <Tab title="second">{SECOND_TAB_CONTENT}</Tab>
      </Tabs>
    );

    expect(queryByText(FIRST_TAB_CONTENT)).toBeDefined();
    expect(queryByText(SECOND_TAB_CONTENT)).toBeNull();
  });

  test("should be able to switch tabs", async () => {
    const { queryByText, queryByTestId } = render(
      <Tabs>
        <Tab title={FIRST_TITLE}>{FIRST_TAB_CONTENT}</Tab>
        <Tab title={SECOND_TITLE}>{SECOND_TAB_CONTENT}</Tab>
      </Tabs>
    );

    expect(queryByTestId(FIRST_TAB_CONTENT)).toBeDefined();
    expect(queryByTestId(SECOND_TAB_CONTENT)).toBeNull();

    // click on tab
    fireEvent.click(queryByText(SECOND_TITLE));

    expect(queryByTestId(SECOND_TAB_CONTENT)).toBeDefined();
    expect(queryByTestId(FIRST_TAB_CONTENT)).toBeNull();
  });
});
