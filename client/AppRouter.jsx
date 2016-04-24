import React from 'react';
import axios from 'axios';
import { Router, Route, hashHistory } from 'react-router';
import actions from './actions';
import Home from './Home';
import Group from './Group';
import store from './store.js';

class AppRouter extends React.Component {
  assignGroup(nextState, replace) {
    const groupName = nextState.params.groupName;
    const action = actions.setGroup(groupName);
    store.dispatch(action);
    axios.post(`/api/group/create/${groupName}`)
    .then(() => nextState)
    .catch(() => {
      replace('/');
    });
  }

  render() {
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={ Home } />
        <Route path="/:groupName"
          component={ Group }
          history={ hashHistory }
          onEnter={ this.assignGroup }
        />
      </Router>
    );
  }
}

module.exports = AppRouter;
