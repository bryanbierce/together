import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import PhotoTile from './Display/PhotoTile';
const { array, string } = React.PropTypes;

const styles = {
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
};

const Display = (props) => (
  <div className="display"
    style={ styles.box }
  >
    {
      props.photos.map((photo) => <PhotoTile photoURL={ photo } />)
    }
  </div>
);
Display.propTypes = {
  groupName: string,
  photos: array,
  finalPhoto: string
};

const mapStateToProps = (state) => (
  {
    groupName: state.get('groupName'),
    photos: state.get('photos'),
    finalPhoto: state.get('finalPhoto')
  }
);

export default connect(mapStateToProps)(Display);
