import React from 'react';
import styles from './styles';
const { string, func } = React.PropTypes;

const Download = (props) => (
    <div id="downloadButton"
      href={ props.finalPhoto }
      download={ `${props.groupName}-Together.png` }
      onClick={ props.downloadFinal }
      style={ styles.button }
    >
      <a
        style={ styles.buttonText }
      >Download Final Photo</a>
    </div>
);
Download.propTypes = {
  downloadFinal: func,
  finalPhoto: string,
  groupName: string
};

export default Download;
