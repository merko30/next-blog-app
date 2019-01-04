import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk'
import { signIn, getCurrentUser } from '../../authActions/authActions';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILED, SIGN_IN, GET_CURRENT_USER, GET_CURRENT_USER_SUCCESS } from '../../authActions/types';



const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({ user: null, error: null, loading: false })

afterEach(() => {
    jest.resetAllMocks();

    store.clearActions();
})

test('login dispatches login, login success and get current user if everything is okay', () => {

    let expectedActions = [
        SIGN_IN,
        SIGN_IN_SUCCESS,
        GET_CURRENT_USER,
        GET_CURRENT_USER_SUCCESS
    ]

    window.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve({ user: { user: { _id: "123" }, token: "faketoken", message: "Logged in" } }) }))

    return store.dispatch(signIn({ username: "fakeone", password: "anotherfake" })).then(() => {

        const actualActions = store.getActions().map(actions => actions.type)

        expect(actualActions).toEqual(expectedActions)

    })
})


test('dispatches fail action', () => {

    let expectedActions = [
        SIGN_IN,
        SIGN_IN_FAILED
    ]

    window.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.reject({ status: 400, ok: false, json: () => Promise.reject({ message: "Error happened" }) }))

    return store.dispatch(signIn({ username: "fakeone", password: "anotherfake" })).then(() => {

        const actualActions = store.getActions().map(actions => actions.type)

        expect(actualActions).toEqual(expectedActions)
    })

})