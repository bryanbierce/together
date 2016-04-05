import { createStore, compose } from 'redux';
import reducer from './reducers';
import { Map, List } from 'immutable';

// const rand = Math.random() * 20;
const pics = [];
// for (let i = 0; i < rand; i++) {
//   pics.push('http://placekitten.com/400/300');
// }



const initialState = new Map({ groupName: '', photos: new List(pics), finalPhoto: '' });

const store = createStore(reducer, initialState, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : (f) => f
));

export default store;
