import React from 'react';
import GroupForm from './Home/GroupForm';
import './styles/components/home';
const { func } = React.PropTypes;


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCreateClick(event) {
    const groupName = document.getElementById('homeInputGroup').value.split(' ').join('_');
    // this.props.history.push(`${groupName}`);
  }

  handleFormSubmit(target) {
    target.event.preventDefault();
    console.log('in handler');
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
  history: func
};


export default Home;
