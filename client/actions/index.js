const actions = {
  setGroup: (groupName) => ({ type: 'SET_GROUP_NAME', groupName }),
  submitFinal: () => ({ type: 'SUBMIT_FINAL' }),
  addPhoto: (photo) => ({ type: 'ADD_PHOTO', photo })
};

export default actions;
