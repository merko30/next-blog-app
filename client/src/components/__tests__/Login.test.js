import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';
import { renderWithRouter } from '../../test/utils';
import faker from 'faker';

import { LoginForm } from '../forms/LoginForm';

let mockLogin;


afterEach(() => {
    cleanup()
})



test('onChange and submit login', () => {
    mockLogin = jest.fn()

    let { getByText, getByLabelText } = renderWithRouter(<LoginForm signIn={mockLogin} />,
        { route: "/login" })


    let usernameInput = getByLabelText(/username/i);
    let passwordInput = getByLabelText(/password/i);

    let username = faker.internet.userName()
    let password = faker.internet.password();

    fireEvent.change(usernameInput, { target: { name: "username", value: username } })
    fireEvent.change(passwordInput, { target: { name: "password", value: password } })

    expect(usernameInput.value).toEqual(username);
    expect(passwordInput.value).toEqual(password);

    fireEvent.submit(getByText('Login'), { preventDefault: jest.fn() })

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({ username, password })

})


test('should show error message if exists', () => {

    let error = "Wrong password";
    let { getByTestId } = renderWithRouter(<LoginForm error={error} />, { route: "/login" })

    const errorNode = getByTestId('error-message');
    expect(errorNode.textContent).toEqual(error)
})


test(`should show validation error if username or password is blank`, () => {
    mockLogin = jest.fn()

    let { getByText, getByLabelText, getByTestId } = renderWithRouter(<LoginForm signIn={mockLogin} />,
        { route: "/login" })


    let usernameInput = getByLabelText(/username/i);
    let passwordInput = getByLabelText(/password/i);

    let password = faker.internet.password();

    fireEvent.change(usernameInput, { target: { name: "username", value: "" } })
    fireEvent.change(passwordInput, { target: { name: "password", value: password } })

    expect(usernameInput.value).toEqual("");
    expect(passwordInput.value).toEqual(password);

    fireEvent.submit(getByText('Login'), { preventDefault: jest.fn() })

    // won't call login if user didn't pass the validation
    //expect(mockLogin).toHaveBeenCalledTimes(1);
    //expect(mockLogin).toHaveBeenCalledWith({ username, password })

    const error = getByTestId('error-message');
    let message = "Username is required";
    expect(error).not.toBeNull();
    expect(error.textContent).toEqual(message);

})
