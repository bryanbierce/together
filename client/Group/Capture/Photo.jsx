import React from 'react';
import styles from './styles';
const { func } = React.PropTypes;

const Photo = (props) => (
  <div className="output"
    style={ styles.box }
  >
    <img id="photo" alt="Your photo"
      style={ styles.capturePic }
    />
    <a id="saveButton"
      onClick={ props.handleSaveClick }
      style={ styles.button }
    >Save Photo</a>
  </div>
);
Photo.propTypes = {
  handleSaveClick: func
};

export default Photo;
