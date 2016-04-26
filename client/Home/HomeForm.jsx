import React from 'react';
import '../styles/components/homeForm';
const { func } = React.PropTypes;

const GroupForm = (props) => (
  <form id="homeForm"
    onSubmit={ props.handleSubmit }
  >
    <input id="homeFormUser"
      placeholder="Your Name (Optional)"
      type="text"
    />
    <input id="homeFormGroup"
      placeholder="Your Group Name"
      type="text"
    />
    <input id="homeFormPassword"
      placeholder="Group Password"
      type="password"
    />
    <button id="createBoothButton"
      type="submit"
    >
      Create Your Photo Booth
    </button>
  </form>
);
GroupForm.propTypes = {
  handleSubmit: func
};

module.exports = GroupForm;
