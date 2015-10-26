import React from 'react';
import { Link } from 'react-router';

export default () => (
	<div className="mobile-toolbar">
		<Link to="/nav" activeClassName="active" className="toolbar-btn">☰</Link>
		<Link to={'/tick-trade'} activeClassName="active" className="toolbar-btn"><img src="/public/img/trade.svg" /></Link>
		<Link to={`/watchlist-mobile`} activeClassName="active" className="toolbar-btn"><img src="/public/img/watchlist.svg" /></Link>
		<Link to={'/portfolio-mobile'} activeClassName="active" className="toolbar-btn"><img src="/public/img/portfolio.svg" /></Link>
		<Link to={`/profit-table-mobile`} activeClassName="active" className="toolbar-btn"><img src="/public/img/profit.svg" /></Link>
		<Link to={'/statement-mobile'} activeClassName="active" className="toolbar-btn"><img src="/public/img/statement.svg" /></Link>
		<Link to={`/settings-mobile`} activeClassName="active" className="toolbar-btn"><img src="/public/img/settings.svg" /></Link>
	</div>
);
