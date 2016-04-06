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
      props.photos.map((photo, i) => <PhotoTile photoURL={ photo } key={ i } />)
    }
    {/*<img className="tempStandIn" src="Pic1.png" />
    <img className="tempStandIn" src="Pic2.png" />*/}
    <br />
    <img id="temp" src="" />
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
