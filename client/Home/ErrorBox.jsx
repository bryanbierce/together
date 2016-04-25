import React from 'react';
import '../styles/components/errorBox';
const { func, string } = React.PropTypes;

const ErrorBox = (props) => {
  let errorDiv;
  if (props.errorType === 'groupName') {
    errorDiv = (
      <div id="homeError">
        <p>That group already exists.
          Would you like to&nbsp;
          <span id="homeErrorLink"
            onClick={ props.errorGroupLink }
          >
            join the group?
          </span>
        </p>
      </div>
    );
  } else if (props.errorType === 'invalidPassword') {
    errorDiv = (
      <div id="homeError">
        <p>Invalid password. Please use only letters and numbers.</p>
      </div>
    );
  } else if (props.errorType === 'incorrectPassword') {
    errorDiv = (
      <div id="homeError">
        <p>Incorrect Password. Check with the group owner and try again.</p>
      </div>
    );
  }
  return errorDiv;
};
ErrorBox.propTypes = {
  errorType: string,
  errorGroupLink: func
};

module.exports = ErrorBox;
