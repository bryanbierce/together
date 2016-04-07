const actions = {
  setGroup: (groupName) => ({ type: 'SET_GROUP_NAME', groupName }),
  submitFinal: (finalPhoto) => ({ type: 'SUBMIT_FINAL', finalPhoto }),
  addPhoto: (photo) => ({ type: 'ADD_PHOTO', photo })
};

export default actions;
