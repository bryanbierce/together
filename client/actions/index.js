const actions = {
  addPhoto: (photo) => ({ type: 'ADD_PHOTO', photo }),
  clearHomeError: () => ({ type: 'CLEAR_HOME_ERROR' }),
  clearLoginError: () => ({ type: 'CLEAR_LOGIN_ERROR' }),
  clearPhotos: () => ({ type: 'CLEAR_PHOTOS' }),
  removeAuth: () => ({ type: 'REMOVE_AUTH' }),
  removeGroup: () => ({ type: 'REMOVE_GROUP' }),
  setAuth: () => ({ type: 'SET_AUTH' }),
  setGroup: (groupName) => ({ type: 'SET_GROUP_NAME', groupName }),
  setHomeError: (errorObj) => ({ type: 'SET_HOME_ERROR', errorObj }),
  setLoginError: (errorObj) => ({ type: 'SET_LOGIN_ERROR', errorObj }),
  setUser: (user) => ({ type: 'SET_USER', user }),
  setUserHash: (userHash) => ({ type: 'SET_USER_HASH', userHash }),
  submitFinal: (finalPhoto) => ({ type: 'SUBMIT_FINAL', finalPhoto })
};

export default actions;
