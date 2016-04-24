const actions = {
  setGroup: (groupName) => ({ type: 'SET_GROUP_NAME', groupName }),
  submitFinal: (finalPhoto) => ({ type: 'SUBMIT_FINAL', finalPhoto }),
  addPhoto: (photo) => ({ type: 'ADD_PHOTO', photo }),
  setHomeError: (errorObj) => ({ type: 'SET_HOME_ERROR', errorObj }),
  clearHomeError: () => ({ type: 'CLEAR_HOME_ERROR' })
};

export default actions;
