import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import store from './store.js';
import actions from './actions';
import Home from './Home';
import Group from './Group';

class App extends React.Component {
  assignGroup(nextState) {
    //  Call to db to check if the room exists.
    //  TODO
    //  Fire action to set room
    const action = actions.setGroup(nextState.params.groupName);
    store.dispatch(action);

    return nextState;
  }
  render() {
    return (
      <Provider store={ store } >
        <Router history={ hashHistory }>
          <Route path="/" component={ Home } />
          <Route path="/:groupName" component={ Group }
            onEnter={ this.assignGroup }
          />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
