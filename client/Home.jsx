import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { generateHash, methodBinder, userInput } from './utils';
import GroupForm from './Home/HomeForm';
import ErrorBox from './Global/ErrorBox';
import actions from './actions';
import './styles/components/home';
const { bool, func, object, string } = React.PropTypes;


class Home extends React.Component {
  constructor(props) {
    super(props);

    methodBinder.call(this);
  }

  componentDidMount() {
    const user = window.localStorage.getItem('com.pt-user');
    let userHash = window.localStorage.getItem('com.pt-userHash');
    if (user) {
      this.props.setUser(user);
      document.getElementById('homeFormUser').value = user;
    }
    if (!userHash) {
      userHash = generateHash();
    }
    this.props.setUserHash(userHash);
    document.getElementById('homeFormGroup').focus();
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
      window.localStorage.setItem('com.pt-user', user);
    }

    const groupName = userInput.clean(form.homeFormGroup.value).split(' ').join('-');
    const password = form.homeFormPassword.value;
    const homeError = {
      errorType: '',
      groupName,
      isError: true
    };

    if (!groupName.length) {
      homeError.errorType = 'noGroupName';
      this.props.setHomeError(homeError);
    } else if (password.length && userInput.passCheck(password)) {
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
        homeError.errorType = 'groupName';
        this.props.setHomeError(homeError);
      });
    } else if (!password.length) {
      homeError.errorType = 'noPassword';
      this.props.setHomeError(homeError);
    } else {
      homeError.errorType = 'invalidPassword';
      this.props.setHomeError(homeError);
    }
  }

  navToGroup(groupName) {
    if (this.props.isError) this.props.clearHomeError();
    this.props.history.push(`${groupName}`);
  }

  render() {
    console.log(this);
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
