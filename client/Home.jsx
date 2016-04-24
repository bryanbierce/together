import React from 'react';
import axios from 'axios';
import userInput from './utils/userInput';
import GroupForm from './Home/GroupForm';
import './styles/components/home';
const { object } = React.PropTypes;


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleCreateClick(event) {
    const groupName = document.getElementById('homeInputGroup').value.split(' ').join('_');
    // this.props.history.push(`${groupName}`);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const groupName = userInput.clean(form.homeFormGroup.value).split(' ').join('-');
    const password = form.homeFormPassword.value;
    if (password.length && userInput.passCheck(password)) {
      // axios.post(`/api/group/create/${groupName}`)
      // .then(() => nextState)
      // .catch(() => {
      //   replace('/');
      // });

    }
    console.log(groupName, ' ', password, ' in handler');
  }

  render() {
    return (
      <div id="home">
        <div id="homeContent">
          <h1 id="homeHeader">Get a Group Together</h1>
          <GroupForm handleSubmit={ this.handleFormSubmit } />
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  history: object
};


export default Home;
