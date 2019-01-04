import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import { renderWithRouter } from '../../test/utils';

import { CommentItem } from '../CommentItem';


describe('CommentItem component', () => {

    const fakeId = "123456";
    const fakePostId = "34567";
    const props = {
        loggedIn: true,
        currentUser: { _id: fakeId },
        postID: fakePostId
    }
    let mockRemoveComment;

    beforeEach(() => {

        mockRemoveComment = jest.fn();
    })

    afterEach(() => {
        cleanup()
    })



    test('should show "X" button if comment author and currentUser matches', () => {

        let comment = { _id: "3567fvcg", created_at: new Date().toISOString(), comment: "Fake comment", author: { _id: fakeId, name: "Author Name", username: "Author username", email: "author@gmail.com", avatar: "fake.png" } }

        let { getByTestId } = renderWithRouter(<CommentItem comment={comment} removeComment={mockRemoveComment} {...props} />)

        let xIcon = getByTestId("x-icon")

        expect(xIcon).not.toBeNull()

    })

    test('removeComment should be called on X click', () => {

        let comment = { _id: "3567fvcg", created_at: new Date().toISOString(), comment: "Fake comment", author: { _id: fakeId, name: "Author Name", username: "Author username", email: "author@gmail.com", avatar: "fake.png" } }

        let { getByTestId } = renderWithRouter(<CommentItem comment={comment} removeComment={mockRemoveComment} {...props} />)

        let xIcon = getByTestId("x-icon")

        fireEvent.click(xIcon);

        expect(mockRemoveComment).toHaveBeenCalledTimes(1);
        expect(mockRemoveComment).toHaveBeenCalledWith(comment._id, fakePostId)

    })


})

