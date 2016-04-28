import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Home from './Home';
import GroupLogin from './GroupLogin';
import Group from './Group';
import { generateHash, methodBinder } from './utils';
const { bool, string } = React.PropTypes;


class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    methodBinder.call(this);
  }

  checkAuth(nextState, replace) {
    const groupName = nextState.params.groupName;
    if (!window.localStorage.getItem('com.pt-userHash')) {
      const userHash = generateHash();
      window.localStorage.setItem('com.pt-userHash', userHash);
    }
    if (!this.props.isAuthed) {
      replace(`/groupLogin/${groupName}`);
    }
    return nextState;
  }

  render() {
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={ Home } />
        <Route path="groupLogin/:groupName" component={ GroupLogin } />
        <Route path="/:groupName"
          component={ Group }
          onEnter={ this.checkAuth }
        />
      </Router>
    );
  }
}
AppRouter.propTypes = {
  groupName: string,
  isAuthed: bool,
  user: string,
  userHash: string
};

const mapStateToProps = (state) => ({
  groupName: state.get('groupName'),
  isAuthed: state.get('isAuthed'),
  user: state.get('user'),
  userHash: state.get('userHash')
});

module.exports = connect(mapStateToProps)(AppRouter);
