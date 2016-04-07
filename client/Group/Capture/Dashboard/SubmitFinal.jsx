import React from 'react';
import styles from './styles';
const { func } = React.PropTypes;


const SubmitFinal = (props) => (
    <a id="finalSubmitButton"
      onClick={ props.handleSubmitFinal }
      style={ styles.button }
    >Submit Group Photo</a>
);
SubmitFinal.propTypes = {
  handleSubmitFinal: func
};

export default SubmitFinal;
