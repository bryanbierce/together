import { Map } from 'immutable';

const addPhoto = (state, photo) => state.setIn(['photos', photo.userHash], photo.photo);

const setHomeError = (state, errorObj) => state.set('homeError', new Map(errorObj));

const setLoginError = (state, errorObj) => state.set('loginError', new Map(errorObj));

const submitFinal = (state, finalPhoto) => state.set('finalPhoto', finalPhoto).set('isFinal', true);

const reducer = (state = new Map(), action) => {
  switch (action.type) {
    case 'ADD_PHOTO':
      return addPhoto(state, action.photo);
    case 'CLEAR_HOME_ERROR':
      return state.set('homeError', { errorType: '', groupName: '', isError: false });
    case 'CLEAR_LOGIN_ERROR':
      return state.set('loginError', { errorType: '', isError: false });
    case 'CLEAR_PHOTOS':
      return state.set('photos', new Map());
    case 'REMOVE_AUTH':
      return state.set('isAuthed', false);
    case 'REMOVE_GROUP':
      return state.set('groupName', '');
    case 'SET_AUTH':
      return state.set('isAuthed', true);
    case 'SET_GROUP_NAME':
      return state.set('groupName', action.groupName);
    case 'SET_HOME_ERROR':
      return setHomeError(state, action.errorObj);
    case 'SET_LOGIN_ERROR':
      return setLoginError(state, action.errorObj);
    case 'SET_USER':
      return state.set('user', action.user);
    case 'SET_USER_HASH':
      return state.set('userHash', action.userHash);
    case 'SUBMIT_FINAL':
      return submitFinal(state, action.finalPhoto);
    default:
      return state;
  }
};

export default reducer;
// module.exports = reducer;
