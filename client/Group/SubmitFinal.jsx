import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
const { func } = React.PropTypes;
const submitFinal = actions.submitFinal;

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    border: '5px solid #ddd',
    backgroundColor: '#ccc',
    height: 50
  },
  button: {
    flexGrow: 1,
    backgroundColor: 'cornflowerblue',
    color: '#fff',
    textAlign: 'center',
    textDecoration: 'none'
  }
};

const SubmitFinal = (props) => (
  <div id="submitFinal"
    style={ styles.box }
  >
    <a onClick={ props.submitFinal }
      style={ styles.button }
    >Submit Group Photo</a>
    <canvas id="finalCanvas" hidden ></canvas>
  </div>
);
SubmitFinal.propTypes = {
  submitFinal: func
};

const mapDispatchToProps = (dispatch) => ({ submitFinal: () => dispatch(submitFinal()) });

export default connect(null, mapDispatchToProps, null, { pure: true })(SubmitFinal);
