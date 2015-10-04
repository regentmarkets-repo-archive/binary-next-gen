import React from 'react';
import { Link } from 'react-router';
import { LogoSpinner } from '../common';

const DesktopToolbar = () => (
	<div>
		<LogoSpinner />
		<Link to={'/trade'} activeClassName="active" className="button">Trade</Link>
		<Link to={'/trade'} activeClassName="active" className="button">Chart</Link>
		<Link to={'/portfolio-popup'} activeClassName="active" className="button">Portfolio</Link>
		<Link to={'/statement'} activeClassName="active" className="button">Statement</Link>
		<Link to={'/asset-index'} activeClassName="active" className="button">Asset Index</Link>
		<Link to={'/profit-table'} activeClassName="active" className="button">Profit Table</Link>
		<Link to={'/settings'} activeClassName="active" className="button">Settings</Link>
		<Link to={`/rise-fall-table`} activeClassName="active" className="button">Rise/Fall Table</Link>
		<Link to={`/trading-times`} activeClassName="active" className="button">Trading Times</Link>
		<Link to={`/pricing-table`} activeClassName="active" className="button">Pricing Table</Link>
		<Link to={`/daily-prices`} activeClassName="active" className="button">Daily Prices</Link>
		<Link to={`/intraday-prices`} activeClassName="active" className="button">Intrday Prices</Link>
	</div>
);

export default DesktopToolbar;
