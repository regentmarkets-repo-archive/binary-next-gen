import React from 'react';
import { MobileSidebar, MobileToolbarBtn } from './';

export default () => (
	<div className="mobile-toolbar">
		<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
		<label id="hamburger-overlay" htmlFor="hamburger-closer"></label>
		<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
		<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
			<img src="img/menu.svg" />
			<MobileSidebar />
		</label>
		<MobileToolbarBtn to={'/tick-trade'} img="img/trade.svg" />
		<MobileToolbarBtn to={`/watchlist-mobile`} img="img/watchlist.svg" />
		<MobileToolbarBtn to={'/portfolio-mobile'} img="img/portfolio.svg" />
		<MobileToolbarBtn to={`/video-mobile`} img="img/profit.svg" />
		<MobileToolbarBtn to={'/statement-mobile'} img="img/statement.svg" />
		<MobileToolbarBtn to={`/settings-mobile`} img="img/settings.svg" />
	</div>
);
