import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MobileSidebarContainer from '../sidebar/MobileSidebarContainer';
import MobileToolbarBtn from './MobileToolbarBtn';

export default class MobileToolbarFull extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<div className="mobile-toolbar">
				<MobileSidebarContainer />
				<MobileToolbarBtn to={'/'} img="img/trade.svg" />
				{/* <MobileToolbarBtn to={'/watchlist-mobile'} img="img/watchlist.svg" /> */}
				<MobileToolbarBtn to={'/portfolio-mobile'} img="img/portfolio.svg" />
				<MobileToolbarBtn to={'/statement-mobile'} img="img/statement.svg" />
				<MobileToolbarBtn to={'/news-mobile'} img="img/news.svg" />
				<MobileToolbarBtn to={'/resources-mobile'} img="img/resources.svg" />
				{/* <MobileToolbarBtn to={'/settings-mobile'} img="img/settings.svg" /> */}
			</div>
		);
	}
}
