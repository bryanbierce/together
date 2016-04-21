import React from 'react';
import './styles/components/home';
const { func } = React.PropTypes;


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCreateClick() {
    const groupName = document.getElementById('homeInputGroup').value.split(' ').join('_');
    this.props.history.push(`${groupName}`);
  }

  render() {
    return (
      <div id="home">
        <div id="homeContent">
          <h1 id="homeHeader">Get a Group Together</h1>
          <input id="homeInputGroup"
            placeholder="Your group name"
            type="text"
          />
          <div id="createBoothButton"
            onClick={ this.handleCreateClick }
          >
            <p>Create Your Photo Booth</p>
          </div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  history: func
};


export default Home;
