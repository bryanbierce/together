import React from 'react';
import styles from './styles';
const { func } = React.PropTypes;


const SubmitFinal = (props) => (
    <div id="finalSubmitButton"
      onClick={ props.handleSubmitFinal }
      style={ styles.button }
      onMouseEnter={ props.mouseEnter }
      onMouseExit={ props.MouseLeave }
    >
      <a
        style={ styles.buttonText }
      >Submit Group Photo</a>
    </div>
);
SubmitFinal.propTypes = {
  handleSubmitFinal: func
};

export default SubmitFinal;
