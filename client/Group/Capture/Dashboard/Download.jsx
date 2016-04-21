import React from 'react';
import '../../../styles/components/download';
const { string, func } = React.PropTypes;

const Download = (props) => (
    <div id="downloadButton"
      href={ props.finalPhoto }
      download={ `${props.groupName}-Together.png` }
      onClick={ props.downloadFinal }
    >
      <p>Download Final Photo</p>
    </div>
);
Download.propTypes = {
  downloadFinal: func,
  finalPhoto: string,
  groupName: string
};

export default Download;
