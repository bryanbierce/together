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
    //  Call to db to check if the room exists.
    //  TODO
    //  Fire action to set room
    console.log("In onEnter", nextState.params.groupName);
    const groupName = nextState.params.groupName;
    axios.post(`/api/group/create/${groupName}`)
    .then((res) => {
      console.log(res);
      const action = actions.setGroup(groupName);
      store.dispatch(action);

      return nextState;
    })
    .catch((err) => {
      console.log(err);
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
