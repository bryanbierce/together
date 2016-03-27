import { createStore, compose } from 'redux';
import reducer from './reducers';
import { Map } from 'immutable';
// var createStore = require('redux').createStore;
// var reducer = require('./reducer.js');
// var Map = require('immutable').Map;

const initialState = new Map();

const store = createStore(reducer, initialState, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : (f) => f
));

export default store;
// module.exports = createStore(reducer, initialStore);
