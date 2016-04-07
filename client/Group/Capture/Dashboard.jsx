import React from 'react';
import Download from './Dashboard/Download';
import SubmitFinal from './Dashboard/SubmitFinal';
import styles from './Dashboard/styles';
const { bool, string, func } = React.PropTypes;

const Dashboard = (props) => {
  const download = props.isFinal === true ?
    <Download
      downloadFinal={ props.downloadFinal }
      finalPhoto={ props.finalPhoto }
      groupName={ props.groupName }
    />
    : [];

  return (
    <div id="dashboard"
      style={ styles.box }
    >
      { download }
      <SubmitFinal handleSubmitFinal={ props.handleSubmitFinal } />
    </div>
  );
};
Dashboard.propTypes = {
  downloadFinal: func,
  finalPhoto: string,
  isFinal: bool,
  groupName: string,
  handleSubmitFinal: func
};

export default Dashboard;
