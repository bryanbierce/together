import React from 'react';
import '../../../styles/components/submitfinal';
const { func } = React.PropTypes;


const SubmitFinal = (props) => (
    <div id="finalSubmitButton"
      onClick={ props.handleSubmitFinal }
    >
      <p>Submit Group Photo</p>
    </div>
);
SubmitFinal.propTypes = {
  handleSubmitFinal: func,
};

export default SubmitFinal;
