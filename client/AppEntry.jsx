import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import Home from './Home.jsx';
// var React = require('react');
// var ReactDOM = require('react-dom');
// var Provider = require('react-redux').Provider;
// var store = require('./store.js');
// var Home = require('./Home.jsx');

ReactDOM.render(
  <Provider store={store} >
    <Home />
  </Provider>,
  document.getElementById('app')
);
