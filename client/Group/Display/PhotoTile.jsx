import React from 'react';
const { string } = React.PropTypes;

const styles = {
  frame: {
    padding: '10px solid #ddd',
    width: 410,
    height: 310
  },
  img: {
    width: 400,
    height: 300
  }
};

const PhotoTile = (props) => (
  <div className="photoTile"
    style={ styles.frame }
  >
    <img src={ props.photoURL }
      style={ styles.img }
    />
  </div>
);
PhotoTile.propTypes = {
  photoURL: string
};

export default PhotoTile;
