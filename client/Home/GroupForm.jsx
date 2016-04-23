import React from 'react';
import '../styles/components/groupForm';
const { func } = React.PropTypes;

const GroupForm = (props) => (
  <form id="homeForm"
    onSubmit={ props.handleFormSubmit }
  >
    <input id="homeFormGroup"
      placeholder="Your group name"
      type="text"
    />
    <input id="homeFormPassword"
      password
      placeholder="Password for a private group"
      type="text"
    />
    <button id="createBoothButton"
      type="submit"
    >
      <p>Create Your Photo Booth</p>
    </button>
  </form>
);
GroupForm.propTypes = {
  handleFormSubmit: func
};

module.exports = GroupForm;
