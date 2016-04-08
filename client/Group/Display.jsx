import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import PhotoTile from './Display/PhotoTile';
const { object, string } = React.PropTypes;

const styles = {
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
};

const Display = (props) => (
  <div id="display"
    style={ styles.box }
  >
    {
      (() => {
        const PhotoTiles = [];
        props.photos.forEach((photo, i) => {
          PhotoTiles.push(<PhotoTile photoURL={ photo } key={ i } />);
        });
        return PhotoTiles;
      })()
    }
  </div>
);
Display.propTypes = {
  groupName: string,
  photos: object,
  finalPhoto: string
};

const mapStateToProps = (state) => (
  {
    groupName: state.get('groupName'),
    photos: state.get('photos'),
    finalPhoto: state.get('finalPhoto')
  }
);

export default connect(mapStateToProps, null, null, { pure: true })(Display);
