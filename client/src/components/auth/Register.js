import React from "react";
import RegisterForm from "../forms/RegisterForm";

class Register extends React.Component {
  render() {
    return (
      <div className="register">
        <h1 className="center-text">Register</h1>
        <RegisterForm />
      </div>
    );
  }
}

export default Register;
