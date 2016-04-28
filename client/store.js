import { createStore, compose } from 'redux';
import reducer from './reducers';
import { Map } from 'immutable';


const initialState = new Map({
  finalPhoto: null,
  groupName: '',
  homeError: {
    errorType: '',
    groupName: '',
    isError: false
  },
  isAuthed: false,
  isFinal: false,
  loginError: {
    errorType: '',
    isError: false
  },
  photos: new Map(),
  user: '',
  userHash: ''
});

// const store = createStore(reducer, initialState, compose(
//   typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
//     ? window.devToolsExtension()
//     : (f) => f
// ));
const store = createStore(reducer, initialState);

export default store;
