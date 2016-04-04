import { createStore, compose } from 'redux';
import reducer from './reducers';
import { Map, List } from 'immutable';

const initialState = new Map({ group: '', photos: new List() });

const store = createStore(reducer, initialState, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : (f) => f
));

export default store;
