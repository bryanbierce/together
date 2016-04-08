import { createStore, compose } from 'redux';
import reducer from './reducers';
import { Map } from 'immutable';


const initialState = new Map({
  groupName: '',
  photos: new Map(),
  finalPhoto: null,
  isFinal: false
});

const store = createStore(reducer, initialState, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : (f) => f
));

export default store;
