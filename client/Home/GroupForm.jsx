import React from 'react';
import '../styles/components/groupForm';
const { func } = React.PropTypes;

const GroupForm = (props) => (
  <form id="homeForm"
    onSubmit={ props.handleSubmit }
  >
    <input id="homeFormGroup"
      placeholder="Your group name"
      type="text"
    />
    <input id="homeFormPassword"
      placeholder="Password"
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
  handleFormSubmit: func
};

module.exports = GroupForm;
