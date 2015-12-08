import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DesktopNavLink = ({ to, text }) => (
	<Link to={to} className="toolbar-btn" activeClassName="active">
		{text}
	</Link>
);

DesktopNavLink.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string,
};

export default DesktopNavLink;
