import React from 'react';
import { Link } from 'react-router';

const DesktopNavLink = ({ to, text }) => (
	<Link to={to} className="toolbar-btn" activeClassName="active">
		{text}
	</Link>
);

DesktopNavLink.propTypes = {
	to: React.PropTypes.string,
	text: React.PropTypes.string,
};

export default DesktopNavLink;
