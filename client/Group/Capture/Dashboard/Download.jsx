import React from 'react';
import styles from './styles';
const { string, func } = React.PropTypes;

const Download = (props) => (
    <a id="downloadButton"
      href={ props.finalPhoto }
      download={ `${props.groupName}-Together.png` }
      onClick={ props.downloadFinal }
      style={ styles.button }
    >Download Final Photo</a>
);
Download.propTypes = {
  downloadFinal: func,
  finalPhoto: string,
  groupName: string
};

export default Download;
