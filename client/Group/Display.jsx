import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import PhotoTile from './Display/PhotoTile';
import '../styles/components/display';
const { object, string } = React.PropTypes;


const Display = (props) => (
  <div id="displayFrame">
    <ReactCSSTransitionGroup
      id="display"
      transitionName="photoTile"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
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
    </ReactCSSTransitionGroup>
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
