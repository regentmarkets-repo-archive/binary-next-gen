import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NumberPlain } from '../_common';
import SidebarBtn from './SidebarBtn';

@connect(state => ({ account: state.account }))
export default class MobileSidebar extends React.Component {

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
					<NumberPlain currency={account.currency} value={account.balance} />
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
