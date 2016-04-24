import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import store from './store.js';


const App = () => (
  <Provider store={ store } >
    <AppRouter />
  </Provider>
);


// const mapDispatchToProps = (dispatch) => ({ addPhoto: (photo) => dispatch(addPhoto(photo)) });

ReactDOM.render(<App />, document.getElementById('app'));
