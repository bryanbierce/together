import React from 'react';
const { func } = React.PropTypes;

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCreateClick() {
    const groupName = document.getElementById('inputGroup').value.split(' ').join('_');
    //  call to database to see if group already exists
    this.props.history.push(`${groupName}`);
  }

  render() {
    return (
      <div className="home"
        style={ styles.box }
      >
        <h1>Get a group Together</h1>
        <input id="inputGroup"
          type="text"
        />
        <a id="createBooth"
          placeholder="Your group"
          onClick={ this.handleCreateClick }
        >Create photo booth</a>
      </div>
    );
  }
}
Home.propTypes = {
  history: func
};


export default Home;
