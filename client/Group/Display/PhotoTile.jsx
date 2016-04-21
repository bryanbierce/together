import React from 'react';
import '../../styles/components/photoTile';
const { string } = React.PropTypes;

const PhotoTile = (props) => (
  <div className="photoTile">
    <img src={ props.photoURL } />
  </div>
);
PhotoTile.propTypes = {
  photoURL: string
};

export default PhotoTile;
