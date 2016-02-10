import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Balance from '../balance/BalanceContainer';
import SidebarBtn from './SidebarBtn';
import sidebarSelectors from './sidebarSelectors';

@connect(sidebarSelectors)
export default class MobileSidebar extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		account: PropTypes.object.isRequired,
	};

	render() {
		const account = this.props.account.toJS();

		return (
			<nav className="sidebar">
				<div className="account-info">
					{account.loginid}<br/>
					{account.email}<br/>
					<Balance />
				</div>
				<SidebarBtn to="/mobile" img="img/trade.svg" text="Trade" />
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
