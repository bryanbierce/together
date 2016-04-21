import React from 'react';
import '../../styles/components/photo';
const { func } = React.PropTypes;

const Photo = (props) => (
  <div id="photoBox">
    <img id="photo" alt="Your photo" />
    <div id="saveButton"
      onClick={ props.handleSaveClick }
    >
      <p>Save Photo</p>
    </div>
  </div>
);
Photo.propTypes = {
  handleSaveClick: func
};

export default Photo;
