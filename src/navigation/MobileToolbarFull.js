import React from 'react';
import { Link } from 'react-router';
import NavigationMenu from './NavigationMenu';

export default () => (
	<div className="mobile-toolbar">
		<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
		<label id="hamburger-overlay" htmlFor="hamburger-closer"></label>
		<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
		<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
			<span>☰</span>
			<NavigationMenu />
		</label>
		<Link to={'/tick-trade'} activeClassName="active" className="mobile-nav-btn"><img src="img/trade.svg" /></Link>
		<Link to={`/watchlist-mobile`} activeClassName="active" className="mobile-nav-btn"><img src="img/watchlist.svg" /></Link>
		<Link to={'/portfolio-mobile'} activeClassName="active" className="mobile-nav-btn"><img src="img/portfolio.svg" /></Link>
		<Link to={`/profit-table-mobile`} activeClassName="active" className="mobile-nav-btn"><img src="img/profit.svg" /></Link>
		<Link to={'/statement-mobile'} activeClassName="active" className="mobile-nav-btn"><img src="img/statement.svg" /></Link>
		<Link to={`/settings-mobile`} activeClassName="active" className="mobile-nav-btn"><img src="img/settings.svg" /></Link>
	</div>
);
