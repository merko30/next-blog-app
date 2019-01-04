import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { renderWithRouter, fakePost } from '../../test/utils';

import { PostList } from '../PostList';




describe('PostList component', () => {

    let mockGetPosts = jest.fn();
    let posts = [fakePost(), fakePost(), fakePost()]

    afterEach(() => {
        cleanup()
    })

    test('should call componentDidMount and getPosts', () => {
        let cMd = jest.spyOn(PostList.prototype, "componentDidMount");
        let { container } = render(<PostList getPosts={mockGetPosts} />)

        expect(cMd).toHaveBeenCalledTimes(1);
        expect(mockGetPosts).toHaveBeenCalledTimes(1);

    })

    test('should render three cards', () => {
        let { getAllByTestId } = renderWithRouter(<PostList getPosts={mockGetPosts} posts={posts} />)
        let numberOfRenderedCards = getAllByTestId('card').length

        expect(numberOfRenderedCards).toEqual(3);
    })

})
