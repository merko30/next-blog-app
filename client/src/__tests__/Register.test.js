import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';
import { renderWithRouter } from '../../test/utils';
import faker from 'faker';

import { RegisterForm } from '../forms/RegisterForm';


let usernameInput;
let nameInput;
let passwordInput;
let emailInput;
let avatarInput;
let registerButton;
let username;
let name;
let password;
let files;
let email;
let error;

let mockRegister = jest.fn()

let defaultProps = {
    signUp: mockRegister
}


beforeEach(() => {

    const { getByText, getByLabelText } = renderWithRouter(<RegisterForm {...defaultProps} />,
        { route: "/register" })

    usernameInput = getByLabelText(/username/i);
    nameInput = getByLabelText("Name");
    passwordInput = getByLabelText(/password/i);
    emailInput = getByLabelText(/email/i);
    avatarInput = getByLabelText(/avatar/i);

    username = "johnwayne365"
    name = "John Wayne"
    password = faker.internet.password(12);
    email = faker.internet.email("John", "Wayne");
    files = [{ type: "image/jpg", name: "example.png", size: 35663 }];

    registerButton = getByText('Register');

})

afterEach(() => {
    cleanup()
    error = "";
})

test('onChange and submit register', () => {

    fireEvent.change(usernameInput, { target: { name: "username", value: username } })
    fireEvent.change(nameInput, { target: { name: "name", value: name } })
    fireEvent.change(passwordInput, { target: { name: "password", value: password } })
    fireEvent.change(emailInput, { target: { name: "email", value: email } })
    fireEvent.change(avatarInput, { target: { name: "avatar", files } })

    expect(usernameInput.value).toEqual(username);
    expect(nameInput.value).toEqual(name);
    expect(passwordInput.value).toEqual(password);
    expect(emailInput.value).toEqual(email);
    expect(avatarInput.files[0]).toEqual(files[0]);

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockRegister).toHaveBeenCalledWith({ username, password, email, name, avatar: files[0] })

})


test('should show validation if username is missing or it\'s short', () => {

    const { getByTestId } = renderWithRouter(<RegisterForm {...defaultProps} />,
        { route: "/register" })

    fireEvent.change(usernameInput, { target: { name: "username", value: "" } })
    fireEvent.change(nameInput, { target: { name: "name", value: name } })
    fireEvent.change(passwordInput, { target: { name: "password", value: password } })
    fireEvent.change(emailInput, { target: { name: "email", value: email } })
    fireEvent.change(avatarInput, { target: { name: "avatar", files } })

    error = "Username is required";

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    let errorNode = getByTestId('error-message');

    expect(errorNode.textContent).toEqual(error)

    fireEvent.change(usernameInput, { target: { name: "username", value: "short" } })

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    error = "Username must be longer than 8 characters";

    expect(errorNode.textContent).toEqual(error);

})

test('should show error message if it exists', () => {

    error = "User already exists";

    const { getByTestId } = renderWithRouter(<RegisterForm {...defaultProps} error={error} />,
        { route: "/register" })

    const errorNode = getByTestId('error-message');

    expect(errorNode.textContent).toEqual(error)

})

test('should show validation if name is missing or it\'s short', () => {

    const { getByTestId } = renderWithRouter(<RegisterForm {...defaultProps} />,
        { route: "/register" })

    fireEvent.change(usernameInput, { target: { name: "username", value: username } })
    fireEvent.change(nameInput, { target: { name: "name", value: "" } })
    fireEvent.change(passwordInput, { target: { name: "password", value: password } })
    fireEvent.change(emailInput, { target: { name: "email", value: email } })
    fireEvent.change(avatarInput, { target: { name: "avatar", files } })

    error = "Name is required";

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    let errorNode = getByTestId('error-message');

    expect(errorNode.textContent).toEqual(error)

    fireEvent.change(nameInput, { target: { name: "name", value: "foo" } })

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    error = "Name must be longer than 6 characters";

    expect(errorNode.textContent).toEqual(error);

})

test('should show validation if password is missing or it\'s short', () => {

    const { getByTestId } = renderWithRouter(<RegisterForm {...defaultProps} />,
        { route: "/register" })

    fireEvent.change(usernameInput, { target: { name: "username", value: username } })
    fireEvent.change(nameInput, { target: { name: "name", value: name } })
    fireEvent.change(passwordInput, { target: { name: "password", value: "" } })
    fireEvent.change(emailInput, { target: { name: "email", value: email } })
    fireEvent.change(avatarInput, { target: { name: "avatar", files } })

    error = "Password is required";

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    let errorNode = getByTestId('error-message');

    expect(errorNode.textContent).toEqual(error)

    fireEvent.change(passwordInput, { target: { name: "password", value: "foo" } })

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    error = "Password must be longer than 8 characters";

    expect(errorNode.textContent).toEqual(error);

})

test('should show validation if email is missing or it\'s invalid', () => {

    const { getByTestId } = renderWithRouter(<RegisterForm {...defaultProps} />,
        { route: "/register" })

    fireEvent.change(usernameInput, { target: { name: "username", value: username } })
    fireEvent.change(nameInput, { target: { name: "name", value: name } })
    fireEvent.change(passwordInput, { target: { name: "password", value: password } })
    fireEvent.change(emailInput, { target: { name: "email", value: "" } })
    fireEvent.change(avatarInput, { target: { name: "avatar", files } })

    error = "Email is required";

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    let errorNode = getByTestId('error-message');

    expect(errorNode.textContent).toEqual(error)

    fireEvent.change(emailInput, { target: { name: "email", value: "email.com" } })

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    error = "Invalid email";

    expect(errorNode.textContent).toEqual(error);

})

test('should show validation if image type isn\'t jpeg/jpg/png', () => {

    const { getByTestId } = renderWithRouter(<RegisterForm {...defaultProps} />,
        { route: "/register" })

    fireEvent.change(usernameInput, { target: { name: "username", value: username } })
    fireEvent.change(nameInput, { target: { name: "name", value: name } })
    fireEvent.change(passwordInput, { target: { name: "password", value: password } })
    fireEvent.change(emailInput, { target: { name: "email", value: email } })
    fireEvent.change(avatarInput, { target: { name: "avatar", files: [{ type: "docx", name: "example.png", size: 35663 }] } })

    error = "Invalid image type";

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })

    let errorNode = getByTestId('error-message');

    expect(errorNode.textContent).toEqual(error)


})

test('shows many validation errors', () => {

    const { getAllByTestId } = renderWithRouter(<RegisterForm {...defaultProps} />,
        { route: "/register" })

    fireEvent.change(usernameInput, { target: { name: "username", value: username } })
    fireEvent.change(nameInput, { target: { name: "name", value: name } })
    fireEvent.change(passwordInput, { target: { name: "password", value: "" } })
    fireEvent.change(emailInput, { target: { name: "email", value: email } })
    fireEvent.change(avatarInput, { target: { name: "avatar", files: [{ type: "docx", name: "example.png", size: 35663 }] } })

    fireEvent.submit(registerButton, { preventDefault: jest.fn() })
    let errorNodes = getAllByTestId('error-message');

    expect(errorNodes.length).toBe(2);


})