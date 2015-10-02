import React from 'react';
import { Link } from 'react-router';

const DesktopToolbar = () => (
	<div>
		LOGO
		<Link to={'/trade'} className="button">Trade</Link>
		<Link to={'/trade'} className="button">Chart</Link>
		<Link to={'/portfolio-popup'} className="button">Portfolio</Link>
		<Link to={'/statement'} className="button">Statement</Link>
		<Link to={'/asset-index'} className="button">Asset Index</Link>
		<Link to={'/profit-table'} className="button">Profit Table</Link>
		<Link to={'/settings'} className="button">Settings</Link>
	</div>
);

export default DesktopToolbar;
