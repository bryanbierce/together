import React from 'react';
import '../../styles/components/linkButton';
const { func } = React.PropTypes;

const LinkButton = (props) => (
  <div id="linkButton">
    <div>
      <i className="fa fa-link fa-2x"
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
