import React from 'react';
import '../../styles/components/circleButton';
const { func, string } = React.PropTypes;

const CircleButton = (props) => (
  <div
    id={ props.buttonId }
    className="circleButton"
  >
    <div>
      <i className={ props.linkIcon }
        onClick={ props.clickAction }
      />
    </div>
  </div>
);
CircleButton.propTypes = {
  buttonId: string,
  clickAction: func,
  linkIcon: string
};


export default CircleButton;
