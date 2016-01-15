import React from 'react';
import NavButton from './NavButton';

const DesktopSidebar = () => (
	<div id="desktop-sidebar">
		<NavButton img="trade" text="Trade" />
		<NavButton img="watchlist" text="Watchlist" />
		<NavButton img="portfolio" text="Open Positions" />
		<NavButton img="profit" text="Profit Table" />
		<NavButton img="statement" text="Statement" />
		<NavButton img="settings" text="Settings" />
		<NavButton img="signout" text="Sign Out" />
		<NavButton img="asset-index" text="Asset Index" />
		<NavButton img="trading-times" text="Trading Times" />
		<NavButton img="daily-prices" text="Daily Prices" />
		<NavButton img="rise-fall-table" text="Pricing Table" />
		<NavButton img="rise-fall-table" text="Rise/Fall Table" />
		<NavButton img="videos" text="Videos" />
		<NavButton img="news" text="News" />
		<NavButton img="alerts" text="Alerts" />
		<NavButton img="assets" text="Assets" />
		<NavButton img="cashier" text="Cashier" />
		<NavButton img="charts" text="Charts" />
	</div>
);

export default DesktopSidebar;
