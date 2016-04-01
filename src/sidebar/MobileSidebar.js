import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import BalanceContainer from '../balance/BalanceContainer';
import SidebarBtn from './SidebarBtn';
import sidebarSelectors from './sidebarSelectors';

@connect(sidebarSelectors)
export default class MobileSidebar extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		email: PropTypes.string.isRequired,
		loginid: PropTypes.string.isRequired,
	};

	render() {
		const { loginid, email } = this.props;

		return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
					<BalanceContainer />
				</div>
				<SidebarBtn to="/" img="img/trade.svg" text="Trade" />
				<SidebarBtn to="/watchlist-mobile" img="img/watchlist.svg" text="Watchlist" />
				<SidebarBtn to="/portfolio-mobile" img="img/portfolio.svg" text="Open Positions" />
				<SidebarBtn to="/statement-mobile" img="img/statement.svg" text="Statement" />
				<SidebarBtn to="/news-mobile" img="img/news.svg" text="News" />
				<SidebarBtn to="/resources-mobile" img="img/resources.svg" text="Resources" />
				<SidebarBtn to="/settings-mobile" img="img/settings.svg" text="Settings" />
				<SidebarBtn to="/signout" img="img/signout.svg" text="Sign Out" />
			</nav>
		);
	}
}
