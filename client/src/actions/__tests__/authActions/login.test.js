import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk'
import { signIn } from 'actions';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILED, SIGN_IN, GET_CURRENT_USER, GET_CURRENT_USER_SUCCESS } from '../../authActions/types';
import { wait } from 'react-testing-library';



const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({ user: null, error: null, loading: false })

afterEach(() => {
    store.clearActions();
})

test('login dispatches login, login success and get current user if everything is okay', () => {

    let expectedActions = [
        SIGN_IN,
        SIGN_IN_SUCCESS,
        GET_CURRENT_USER,
        GET_CURRENT_USER_SUCCESS
    ]

    fetch.mockResponse(JSON.stringify({ token: 'token', user: {_id: 'id' }, message: "Logged in" }))
    
    return store.dispatch(signIn({ username: "fakeone", password: "anotherfake" })).then(async () => {

        await wait();

        const actualActions = store.getActions().map(actions => actions.type)

        expect(actualActions).toEqual(expectedActions)

    })
})


test('dispatches fail action', () => {

    let expectedActions = [
        SIGN_IN,
        SIGN_IN_FAILED
    ]

    fetch.mockResponse(new Error('Error occurred'))

    return store.dispatch(signIn({ username: "fakeone", password: "anotherfake" })).then(() => {

        const actualActions = store.getActions().map(actions => actions.type)

        expect(actualActions).toEqual(expectedActions)
    })

})