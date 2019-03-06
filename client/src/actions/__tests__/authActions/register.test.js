import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk'
import { signUp } from 'actions';
import { SIGN_UP_SUCCESS, SIGN_UP_FAILED, SIGN_UP } from '../../authActions/types';
import { wait } from 'react-testing-library';



const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({ user: null, error: null, loading: false })

afterEach(() => {
    store.clearActions();
})

describe('Register', () => {

    const data = {
        username: "fakeOne",
        name: "Fake Userović",
        email: 'fake@gmail.com',
        password: 'password',
    };

    test('should dispatch sign_up and sign_up_success, redirect to login', () => {

    let expectedActions = [
        SIGN_UP,
        SIGN_UP_SUCCESS,
    ]

    
    fetch.mockResponse(JSON.stringify({ message: 'Registered...' }))
    
    return store.dispatch(signUp(data)).then(async () => {

        await wait();

        const actualActions = store.getActions().map(actions => actions.type)

        expect(actualActions).toEqual(expectedActions)
        // redirected to register
        expect(window.location.pathname.includes('register'));

    })
})


test('dispatches fail action if error occurres', () => {
    
    let expectedActions = [
        SIGN_UP,
        SIGN_UP_FAILED
    ]

    fetch.mockResponse(new Error('Error occurred'))
    
    return store.dispatch(signUp(data)).then(() => {
        
        const actualActions = store.getActions().map(actions => actions.type)
        
        expect(actualActions).toEqual(expectedActions)
    })
    
})
})