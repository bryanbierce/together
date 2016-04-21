import React from 'react';
import '../../styles/components/camera';
const { func } = React.PropTypes;


const Camera = (props) => (
  <div id="camera">
    <video id="video"></video>
    <div id="startButton"
      onClick={ props.handleStartClick }
    >
      <p>Take Photo</p>
    </div>
  </div>
);

Camera.propTypes = {
  handleStartClick: func
};

export default Camera;
