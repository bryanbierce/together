import { createStore } from 'redux';
import reducer from './reducer.js';
import { Map } from 'immutable';
const initialStore = new Map();

export default createStore(reducer, initialStore);
