import React from "react";
import { render, cleanup } from "react-testing-library";
import { renderWithRouter, fakePost } from "../utils/tests";

import { PostList } from "../posts/components/PostList";

describe("PostList component", () => {
  let mockGetPosts = jest.fn();
  let posts = [fakePost(), fakePost(), fakePost()];

  afterEach(() => {
    cleanup();
  });

  test("should render three cards", () => {
    let { getAllByTestId } = renderWithRouter(
      <PostList getPosts={mockGetPosts} posts={posts} />
    );
    let numberOfRenderedCards = getAllByTestId("card").length;

    expect(numberOfRenderedCards).toEqual(3);
  });
});
