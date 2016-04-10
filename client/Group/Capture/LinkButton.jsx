import React from 'react';
import styles from './styles';
const { func } = React.PropTypes;

const LinkButton = (props) => (
  <div
    style={ styles.linkButtonWrapper }
  >
    <div
      style={ styles.linkButton }
    >
      <i className="fa fa-link fa-2x"
        style={ styles.linkIcon }
        onClick={ props.getLink }
      />
    </div>
    <p id="roomLink"
      style={{ position: 'absolute', left: '-999em' }}
    >{ location.href.split('?')[0] }</p>
  </div>
);
LinkButton.propTypes = {
  getLink: func
};


export default LinkButton;
