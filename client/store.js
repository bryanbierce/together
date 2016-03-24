import { createStore } from "redux";
import reducer from "./reducers";
import { Map } from "immutable";
// var createStore = require('redux').createStore;
// var reducer = require('./reducer.js');
// var Map = require('immutable').Map;

const initialStore = new Map();

export default createStore(reducer, initialStore);
// module.exports = createStore(reducer, initialStore);
