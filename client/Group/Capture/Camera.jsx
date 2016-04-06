import React from 'react';
import styles from './styles';
const { func } = React.PropTypes;

const Camera = (props) => (
  <div className="camera"
    style={ styles.box }
  >
    <video id="video"
      style={ styles.picSize }
    ></video>
    <a id="startButton"
      onClick={ props.handleStartClick }
      style={ styles.button }
    >Take photo</a>
  </div>
);

Camera.propTypes = {
  handleStartClick: func
};

export default Camera;
