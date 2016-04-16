import React from 'react';
import Download from './Dashboard/Download';
import SubmitFinal from './Dashboard/SubmitFinal';
import '../../styles/components/dashboard';
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
    <div id="dashboard">
      <SubmitFinal handleSubmitFinal={ props.handleSubmitFinal } />
      { download }
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
