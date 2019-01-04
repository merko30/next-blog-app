import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import faker from 'faker';

import { CommentForm } from '../forms/CommentForm';

let mockAddComment = jest.fn()
let fakePostId = "123456"

let props = {
    addComment: mockAddComment,
    isLoggedIn: true,
    match: {
        params: {
            id: fakePostId
        }
    }
}

afterEach(() => {
    cleanup()
})

test('should call addComment if everything is okay ', () => {


    const { getByTestId, getByText } = render(<CommentForm {...props} />)

    let commentInput = getByTestId('comment');

    let comment = "Here is the comment";

    fireEvent.change(commentInput, { target: { name: "comment", value: comment } })

    fireEvent.submit(getByText('Add comment'));

    expect(mockAddComment).toHaveBeenCalledTimes(1);
    expect(mockAddComment).toHaveBeenCalledWith(fakePostId, { comment })

    // input gets cleared after submit
    expect(commentInput.value).toEqual('');

})

test('add comment button should be disabled if user is not logged in', () => {

    const { getByText } = render(<CommentForm isLoggedIn={false} addComment={mockAddComment} />)

    expect(getByText('Add comment').disabled).toBe(true);

})