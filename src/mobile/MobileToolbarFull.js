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
