import React from 'react';
import Capture from './Group/Capture';
import Display from './Group/Display';

const Group = (props) => (
  <div className="group">
    <Capture history={ props.params } />
    <Display />
  </div>
);

export default Group;
