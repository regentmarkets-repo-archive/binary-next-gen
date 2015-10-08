import React from 'react';
import { Link } from 'react-router';

const DesktopNavLink = ({to, text}) => (
	<li className="submenu">
        <div className="nav-trade">
			<Link to={to} activeClassName="active">
				{text}
			</Link>
        </div>
	</li>
);

DesktopNavLink.propTypes = {
	to: React.PropTypes.string,
	text: React.PropTypes.string,
};

export default DesktopNavLink;
