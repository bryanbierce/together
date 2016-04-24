import { Map } from 'immutable';

const addPhoto = (state, photo) => state.setIn(['photos', photo.hashID], photo.photo);

const setHomeError = (state, errorObj) => state.set('homeError', new Map(errorObj));

const submitFinal = (state, finalPhoto) => state.set('finalPhoto', finalPhoto).set('isFinal', true);

const reducer = (state = new Map(), action) => {
  switch (action.type) {
    case 'ADD_PHOTO':
      return addPhoto(state, action.photo);
    case 'CLEAR_HOME_ERROR':
      return state.set('homeError', { errorType: '', groupName: '', isError: false });
    case 'SET_STATE':
      return action.newState;
    case 'SET_GROUP_NAME':
      return state.set('groupName', action.groupName);
    case 'SET_HOME_ERROR':
      return setHomeError(state, action.errorObj);
    case 'SUBMIT_FINAL':
      return submitFinal(state, action.finalPhoto);
    default:
      return state;
  }
};

export default reducer;
// module.exports = reducer;
