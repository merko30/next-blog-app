import React from 'react';
import { render, cleanup } from 'react-testing-library';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { renderWithRouter, fakePost } from '../../test/utils';

import { PostDetail } from '../PostDetail';


describe('PostDetail component', () => {

    let mockStore = configureStore();
    let fakeId = "123456"
    let props = {
        match: { params: { id: fakeId } },
        loggedIn: true,
        currentUser: { _id: fakeId }
    }
    let store;
    let mockGetPost;

    beforeEach(() => {
        store = mockStore({ auth: { isLoggedIn: false, currentUser: null } })
        mockGetPost = jest.fn();
    })

    afterEach(() => {
        cleanup()
    })


    test('should call componentDidMount and getPost', () => {
        let cMd = jest.spyOn(PostDetail.prototype, 'componentDidMount');

        let { container } = renderWithRouter(<Provider store={store}><PostDetail store={store}{...props} getPost={mockGetPost} /></Provider>)

        expect(cMd).toHaveBeenCalledTimes(1);
        expect(mockGetPost).toHaveBeenCalledTimes(1);
        expect(mockGetPost).toHaveBeenCalledWith(fakeId);
    })

    test('should show edit button if post author and currentUser matches', () => {
        store = mockStore({ auth: {} })
        let post = { _id: "3567fvcg", title: "Title", body: "body content", comments: [], image: "fake.png", author: { _id: fakeId, name: "Author Name", username: "Author username", email: "author@gmail.com" } }

        let { getByText } = renderWithRouter(<Provider store={store}><PostDetail post={post} getPost={mockGetPost} {...props} /></Provider>)

        let editButton = getByText(/edit/i)

        expect(editButton).not.toBeNull()

    })


})

