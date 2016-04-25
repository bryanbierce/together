import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {userInput, generateHash } from './utils';
import GroupForm from './Home/GroupForm';
import ErrorBox from './Home/ErrorBox';
import actions from './actions';
import './styles/components/home';
const { bool, func, object, string } = React.PropTypes;


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.displayError = this.displayError.bind(this);
    this.errorGroupLink = this.errorGroupLink.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.navToGroup = this.navToGroup.bind(this);
  }

  componentDidMount() {
    const user = window.localStorage.getItem('com.pt-user');
    if (user) {
      const userHash = window.localStorage.getItem('com.pt-userHash');
      this.props.setUser(user);
      this.props.setUserHash(userHash);
      document.getElementById('homeFormUser').value = user;
    }
    document.getElementById('homeFormUser').focus();
  }

  displayError() {
    let result = '';
    if (this.props.isError) {
      result = (
        <ErrorBox
          errorType={ this.props.errorType }
          errorGroupLink={ this.errorGroupLink }
        />
      );
    }
    return result;
  }

  errorGroupLink() {
    this.navToGroup(this.props.groupName);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    if (!this.props.user) {
      const user = userInput.clean(form.homeFormUser.value);
      const userHash = generateHash();
      window.localStorage.setItem('com.pt-user', user);
      window.localStorage.setItem('com.pt-userHash', userHash);
    }

    const groupName = userInput.clean(form.homeFormGroup.value).split(' ').join('-');
    const password = form.homeFormPassword.value;


    if (password.length && userInput.passCheck(password)) {
      axios.post(`/api/group/create/${groupName}`, { groupName, password })
      .then(() => {
        this.props.setGroup(groupName);
        this.props.setAuth();
        this.navToGroup(groupName);
      })
      .catch(() => {
        form.homeFormGroup.value = '';
        form.homeFormPassword.value = '';
        form.homeFormGroup.classList.add('invalidSubmission');
        const homeError = {
          errorType: 'groupName',
          groupName,
          isError: true
        };
        this.props.setHomeError(homeError);
      });
    } else {
      const homeError = {
        errorType: 'invalidPassword',
        groupName,
        isError: true
      };
      this.props.setHomeError(homeError);
    }
  }

  navToGroup(groupName) {
    if (this.props.isError) this.props.clearHomeError();
    this.props.history.push(`${groupName}`);
  }

  render() {
    return (
      <div id="home">
        <div id="homeContent">
          <h1 id="homeHeader">Get a Group Together</h1>
          <GroupForm handleSubmit={ this.handleFormSubmit } />
        </div>
        {
          this.displayError()
        }
      </div>
    );
  }
}
Home.propTypes = {
  clearHomeError: func,
  errorType: string,
  groupName: string,
  history: object,
  isError: bool,
  setAuth: func,
  setGroup: func,
  setHomeError: func,
  setUser: func,
  setUserHash: func,
  user: string
};

const mapDispatchToProps = (dispatch) => ({
  clearHomeError: () => dispatch(actions.clearHomeError()),
  setAuth: () => dispatch(actions.setAuth()),
  setGroup: () => dispatch(actions.setGroup()),
  setUser: (user) => dispatch(actions.setUser(user)),
  setUserHash: (userHash) => dispatch(actions.setUserHash(userHash)),
  setHomeError: (errorObj) => dispatch(actions.setHomeError(errorObj))
});

const mapStateToProps = (state) => ({
  errorType: state.getIn(['homeError', 'errorType']),
  groupName: state.getIn(['homeError', 'groupName']),
  isError: state.getIn(['homeError', 'isError']),
  user: state.get('user')
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
