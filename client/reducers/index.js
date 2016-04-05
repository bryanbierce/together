import { Map } from 'immutable';
// var Map = require('immutable').Map;

const submitFinal = (state) => {
  //  grab the final photo
  const display = document.getElementById('display');
  const temp = document.getElementById('temp');

  html2canvas(display, {
    onrendered: (canvas) => {
      const result = canvas.toDataURL('image/png');
      temp.src = result;
    }
  }, { allowTaint: true, useCors: true, logging: true });
  //  send photo to the database
};

const reducer = (state = new Map(), action) => {
  switch (action.type) {
    case 'SET_STATE':
      return state;
    case 'SET_GROUP_NAME':
      return state.set('groupName', action.groupName);
    case 'SUBMIT_FINAL':
      submitFinal(state);
      return state;
    default:
      return state;
  }
};

export default reducer;
// module.exports = reducer;
