import { createStore, compose } from 'redux';
import reducer from './reducers';
import { Map, List } from 'immutable';

const pics = [];
const initialState = new Map({
  groupName: '',
  photos: new List(pics),
  finalPhoto: null,
  isFinal: false
});

// const store = createStore(reducer, initialState, compose(
//   typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
//     ? window.devToolsExtension()
//     : (f) => f
// ));
const store = createStore(reducer, initialState);

export default store;
