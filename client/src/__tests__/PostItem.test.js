import React from 'react';
import { fireEvent } from 'react-testing-library';
import { renderWithRouter } from '../../test/utils';

import PostItem from '../PostItem';

let fakeId = "12345"
let fakePost = {
    _id: fakeId,
    title: "Title",
    image: "fake.png",
    author: {
        username: "author12"
    }
}

let props = {
    post: fakePost
}

test('on click should route to detail page', () => {
    let { getByTestId } = renderWithRouter(<PostItem {...props} />)

    let link = getByTestId("post-link");

    fireEvent.click(link);

    expect(window.location.href).toContain(`/post/${fakeId}`)
})

