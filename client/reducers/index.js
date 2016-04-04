import { Map } from 'immutable';
// var Map = require('immutable').Map;

const reducer = (state = new Map(), action) => {
  switch (action.type) {
    case 'SET_STATE':
      return state;
    case 'SET_GROUP':
      return state.set('group', action.groupName);
    default:
      return state;
  }
};

export default reducer;
// module.exports = reducer;
