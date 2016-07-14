import React, { PureComponent } from 'react';
import MobileSidebarContainer from '../sidebar/MobileSidebarContainer';
import MobileToolbarBtn from './MobileToolbarBtn';

export default class MobileToolbarFull extends PureComponent {

	render() {
		return (
			<div className="mobile-toolbar">
				<MobileSidebarContainer />
				<MobileToolbarBtn to={'/'} img="img/trade.svg" />
				{/* <MobileToolbarBtn to={'/watchlist'} img="img/watchlist.svg" /> */}
				<MobileToolbarBtn to={'/portfolio'} img="img/portfolio.svg" />
				<MobileToolbarBtn to={'/statement'} img="img/statement.svg" />
				<MobileToolbarBtn to={'/news'} img="img/news.svg" />
				<MobileToolbarBtn to={'/resources'} img="img/resources.svg" />
				{/* <MobileToolbarBtn to={'/settings'} img="img/settings.svg" /> */}
			</div>
		);
	}
}
