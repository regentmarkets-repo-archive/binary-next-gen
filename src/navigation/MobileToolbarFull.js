import React from 'react';
import { MobileSidebar, MobileToobarBtn } from './';

export default () => (
	<div className="mobile-toolbar">
		<input id="hamburger-closer" type="radio" name="hamburger" defaultChecked />
		<label id="hamburger-overlay" htmlFor="hamburger-closer"></label>
		<input id="hamburger-opener" className="hamburger" type="radio" name="hamburger" />
		<label id="hamburger-btn" htmlFor="hamburger-opener" className="toolbar-btn">
			<img src="img/menu.svg" />
			<MobileSidebar />
		</label>
		<MobileToobarBtn to={'/tick-trade'} img="img/trade.svg" />
		<MobileToobarBtn to={`/watchlist-mobile`} img="img/watchlist.svg" />
		<MobileToobarBtn to={'/portfolio-mobile'} img="img/portfolio.svg" />
		<MobileToobarBtn to={`/video-mobile`} img="img/profit.svg" />
		<MobileToobarBtn to={'/statement-mobile'} img="img/statement.svg" />
		<MobileToobarBtn to={`/settings-mobile`} img="img/settings.svg" />
	</div>
);
