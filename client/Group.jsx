import React from 'react';
import Capture from './Group/Capture';
import Display from './Group/Display';
const { object } = React.PropTypes;

const Group = (props) => (
  <div className="group">
    <Capture history={ props.params } />
    <Display />
  </div>
);
Group.propTypes = {
  params: object
};

export default Group;
