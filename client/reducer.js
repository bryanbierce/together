import { Map } from 'immutable';

const reducer = (state = new Map(), action) => {
  switch (action.type) {
    case 'SET_STATE':
      return state;
    default:
      return state;
  }
};

export default reducer;
