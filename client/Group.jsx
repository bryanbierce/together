import React from 'react';
import Capture from './Group/Capture';
import SubmitFinal from './Group/SubmitFinal';
import Display from './Group/Display';

const Group = () => (
  <div className="group">
    <Capture />
    <SubmitFinal />
    <Display />
  </div>
);

export default Group;
