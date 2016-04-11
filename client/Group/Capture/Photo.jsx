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
    <div id="saveButton"
      onClick={ props.handleSaveClick }
      style={ styles.button }
    >
      <a
        style={ styles.buttonText }
      >Save Photo</a>
    </div>
  </div>
);
Photo.propTypes = {
  handleSaveClick: func
};

export default Photo;
