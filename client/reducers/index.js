import { Map } from 'immutable';
import html2canvas from '../utils/html2canvas';

const addPhoto = (state, photo) => state.update('photos', (photos) => photos.push(photo));

const submitFinal = () => {
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
    case 'ADD_PHOTO':
      return addPhoto(state, action.photo);
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
