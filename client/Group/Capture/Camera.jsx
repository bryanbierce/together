import React from 'react';
import styles from './styles';
const { func } = React.PropTypes;

const Camera = (props) => (
  <div className="camera"
    style={ styles.box }
  >
    <video id="video"
      style={ styles.capturePic }
    ></video>
    <div id="startButton"
      onClick={ props.handleStartClick }
      style={ styles.button }
    >
      <a
        style={ styles.buttonText }
      >Take Photo</a>
    </div>
  </div>
);

Camera.propTypes = {
  handleStartClick: func
};

export default Camera;
