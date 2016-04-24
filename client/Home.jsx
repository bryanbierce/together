import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import userInput from './utils/userInput';
import GroupForm from './Home/GroupForm';
import ErrorBox from './Home/ErrorBox';
import actions from './actions';
import './styles/components/home';
const { bool, func, object, string } = React.PropTypes;


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.displayError = this.displayError.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.navToGroup = this.navToGroup.bind(this);
  }

  displayError() {
    let result = '';
    if (this.props.isError) {
      result = (
        <ErrorBox
          errorType={ this.props.errorType }
          navToGroup={ this.navToGroup }
        />
      );
    }
    return result;
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const groupName = userInput.clean(form.homeFormGroup.value).split(' ').join('-');
    const password = form.homeFormPassword.value;
    if (password.length && userInput.passCheck(password)) {
      axios.post(`/api/group/create/${groupName}`, { groupName, password })
      .then(() => this.navToGroup(groupName))
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
        errorType: 'password',
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
  setHomeError: func
};

const mapDispatchToProps = (dispatch) => ({
  setHomeError: (errorObj) => dispatch(actions.setHomeError(errorObj)),
  clearHomeError: () => dispatch(actions.clearHomeError())
});

const mapStateToProps = (state) => ({
  errorType: state.getIn(['homeError', 'errorType']),
  groupName: state.getIn(['homeError', 'groupName']),
  isError: state.getIn(['homeError', 'isError'])
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
