import React from 'react';
import { Link } from 'react-router';

const DesktopToolbar = () => (
	<div>
		LOGO
		<Link to={'/trade-popup'} className="button">Trade</Link>
		<Link to={'/chart-popup'} className="button">Chart</Link>
		<Link to={'/portfolio-popup'} className="button">Portfolio</Link>
		<Link to={'/statement-popup'} className="button">Statement</Link>
		<Link to={'/asset-index-popup'} className="button">Asset Index</Link>
		<Link to={'/profit-table-popup'} className="button">Profit Table</Link>
		<Link to={'/settings-popup'} className="button">Settings</Link>
	</div>
);

export default DesktopToolbar;
