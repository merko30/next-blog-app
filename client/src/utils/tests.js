import { render, wait } from 'react-testing-library';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import React from 'react';
import faker from 'faker'


export function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
    const history = createBrowserHistory({ initialEntries: [route] })
    const utils = render(<Router history={history}>{ui}</Router>, renderOptions)
    const finishLoading = () =>
        wait(() => expect(utils.queryByText('Loading')).toBeNull())
    return {
        ...utils,
        finishLoading,
        history,
    }
}

export function fakePost() {
    return {
        title: "Title",
        body: "Body content",
        _id: faker.random.uuid(),
        author: {
            _id: "46577rfhtd5", name: "Salomon Kalou", username: "kalou", email: "kalou@gmail.com"
        },
        comments: [{
            _id: "688hjfg34", comment: "Comment one", author: {
                _id: "74368dvfdj3", name: "Didier Drogba", username: "didier", email: "didier@gmail.com"
            }
        }, {
            _id: "56hfhhj5787", comment: "Comment two", author: {
                _id: "46577rfhtd5", name: "Salomon Kalou", username: "kalou", email: "kalou@gmail.com"
            }
        }],
        image: "fake.png"
    }
}