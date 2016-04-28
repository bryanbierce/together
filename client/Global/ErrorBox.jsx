import React from 'react';
import '../styles/components/errorBox';
const { func, string } = React.PropTypes;

const ErrorBox = (props) => {
  let errorInternal;
  if (props.errorType === 'groupName') {
    errorInternal = (
        <p>That group already exists.
          Would you like to&nbsp;
          <span id="homeErrorLink"
            onClick={ props.errorGroupLink }
          >
            join the group?
          </span>
        </p>
    );
  } else if (props.errorType === 'invalidPassword') {
    errorInternal = (
        <p>Invalid password. Please use only letters and numbers.</p>
    );
  } else if (props.errorType === 'noPassword') {
    errorInternal = (
        <p>Please enter a password.</p>
    );
  } else if (props.errorType === 'incorrectPassword') {
    errorInternal = (
      <p>Incorrect password. Check with the group owner and try again.</p>
    );
  } else if (props.errorType === 'noGroupName') {
    errorInternal = (
      <p>Please enter a group name.</p>
    );
  }
  return (
    <div id="homeError">
      { errorInternal }
    </div>
  );
};
ErrorBox.propTypes = {
  errorType: string,
  errorGroupLink: func
};

module.exports = ErrorBox;
