import React from 'react';
import '../styles/components/errorBox';
const { func, string } = React.PropTypes;

const ErrorBox = (props) => {
  let errorDiv;
  if (props.errorType === 'groupName') {
    errorDiv = (
      <div id="homeError">
        <p>That group already exists.
          Would you like to <span id="homeErrorLink"
            onClick={ props.navToGroup }>
            join the group?
          </span>
        </p>
      </div>
    );
  } else if (props.errorType === 'password') {
    errorDiv = (
      <div id="homeError">
        <p>Invalid password. Please use only letters and numbers</p>
      </div>
    );
  }
  return errorDiv;
};
ErrorBox.propTypes = {
  errorType: string,
  navToGroup: func
};

module.exports = ErrorBox;
