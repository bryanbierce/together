import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import store from './store.js';
import actions from './actions';
import Home from './Home';
import Group from './Group';


class App extends React.Component {
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

// const mapDispatchToProps = (dispatch) => ({ addPhoto: (photo) => dispatch(addPhoto(photo)) });

ReactDOM.render(<App />, document.getElementById('app'));
