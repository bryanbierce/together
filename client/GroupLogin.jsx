import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import LoginForm from './GroupLogin/LoginForm';
import ErrorBox from './Global/ErrorBox';
import { generateHash, userInput } from './utils';
import actions from './actions';
import './styles/components/groupLogin';
const { bool, func, object, string } = React.PropTypes;

class GroupLogin extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.displayError = this.displayError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const user = window.localStorage.getItem('com.pt-user');
    let userHash = window.localStorage.getItem('com.pt-userHash');
    if (user) {
      this.props.setUser(user);
    }
    if (!userHash) {
      userHash = generateHash();
    }
    this.props.setUserHash(userHash);
    document.getElementById('loginFormPassword').focus();
  }

  displayError() {
    if (this.props.isError) {
      return (
        <ErrorBox
          errorType={ this.props.errorType }
        />
      );
    }
    return '';
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const groupName = this.props.params.groupName;
    const newUser = userInput.clean(form.loginFormUser.value);
    const password = form.loginFormPassword.value;
    const loginError = {
      errorType: '',
      isError: true
    };

    if (newUser !== this.props.user) {
      window.localStorage.setItem('com.pt-user', newUser);
      this.props.setUser(newUser);
    }

    if (password.length && userInput.passCheck(password)) {
      axios.post('/api/group/login', { groupName, password })
      .then(() => {
        this.props.setGroup(groupName);
        this.props.setAuth();
        if (this.props.isError) this.props.clearLoginError();
        this.props.history.push(`/${groupName}`);
      })
      .catch(() => {
        form.loginFormPassword.value = '';

        loginError.errorType = 'incorrectPassword';
        this.props.setLoginError(loginError);
        form.loginFormPassword.focus();
      });
    } else if (!password.length) {
      loginError.errorType = 'noPassword';
      this.props.setLoginError(loginError);
    } else {
      loginError.errorType = 'invalidPassword';
      this.props.setLoginError(loginError);
    }
  }

  render() {
    return (
      <div id="groupLogin">
        <div id="groupLoginContent">
          <h1 id="groupLoginHeader">
            Join { this.props.params.groupName }
          </h1>
          <LoginForm handleSubmit={ this.handleSubmit } />
        </div>
        { this.displayError() }
      </div>
    );
  }
}
GroupLogin.propTypes = {
  clearLoginError: func,
  errorType: string,
  history: object,
  isError: bool,
  params: object,
  setAuth: func,
  setGroup: func,
  setLoginError: func,
  setUser: func,
  setUserHash: func,
  user: string
};

const mapDispatchToProps = (dispatch) => ({
  clearLoginError: () => dispatch(actions.clearLoginError()),
  setAuth: () => dispatch(actions.setAuth()),
  setGroup: (groupName) => dispatch(actions.setGroup(groupName)),
  setLoginError: (errorObj) => dispatch(actions.setLoginError(errorObj)),
  setUser: (user) => dispatch(actions.setUser(user)),
  setUserHash: (userHash) => dispatch(actions.setUserHash(userHash))
});

const mapStateToProps = (state) => ({
  errorType: state.getIn(['loginError', 'errorType']),
  isError: state.getIn(['loginError', 'isError']),
  user: state.get('user')
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(GroupLogin);
