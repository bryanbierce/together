import React from 'react';
import '../styles/components/loginForm';
const { func, string } = React.PropTypes;


const LoginForm = (props) => (
  <form id="loginForm"
    onSubmit={ props.handleSubmit }
  >
    <input id="loginFormUser"
      type="text"
      placeholder="Your name (Optional)"
      value={ props.user }
    />
    <input id="loginFormPassword"
      type="password"
      placeholder="Group Password"
    />
    <button id="loginFormButton"
      type="submit"
    >
      Join The Group
    </button>
    </form>
);
LoginForm.propTypes = {
  handleSubmit: func,
  user: string
};

module.exports = LoginForm;
