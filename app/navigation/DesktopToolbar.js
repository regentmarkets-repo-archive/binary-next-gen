import React from 'react';
import { Link } from 'react-router';
import { LogoSpinner } from '../common';

const DesktopToolbar = () => (
	<div>
		<LogoSpinner />
		<Link to={'/trade'} className="button">Trade</Link>
		<Link to={'/trade'} className="button">Chart</Link>
		<Link to={'/portfolio-popup'} className="button">Portfolio</Link>
		<Link to={'/statement'} className="button">Statement</Link>
		<Link to={'/asset-index'} className="button">Asset Index</Link>
		<Link to={'/profit-table'} className="button">Profit Table</Link>
		<Link to={'/settings'} className="button">Settings</Link>
		<Link to={`/rise-fall-table`} className="button">Rise/Fall Table</Link>
		<Link to={`/trading-times`} className="button">Trading Times</Link>
		<Link to={`/pricing-table`} className="button">Pricing Table</Link>
		<Link to={`/daily-prices`} className="button">Daily Prices</Link>
		<Link to={`/intraday-prices`} className="button">Intrday Prices</Link>
	</div>
);

export default DesktopToolbar;
