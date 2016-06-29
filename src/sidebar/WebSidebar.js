import React, { PropTypes, Component } from 'react';
import AccountMenuItem from './AccountMenuItem';
import SidebarBtn from './SidebarBtn';

export default class WebSidebar extends Component {

	static propTypes = {
		email: PropTypes.string.isRequired,
		loginid: PropTypes.string.isRequired,
		accounts: PropTypes.arrayOf(PropTypes.shape({
			account: PropTypes.string.isRequired,
			token: PropTypes.string.isRequired,
		})),
	};

	render() {
		const { loginid, email, accounts } = this.props;

		return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
				</div>
				{accounts
					.filter(x => x.account !== loginid)
					.map(x => <AccountMenuItem key={x.token} account={x.account} token={x.token} />)
				}
				{/* <SidebarBtn to="/deposit" img="img/profit.svg" text="Deposit" /> */}
				<SidebarBtn to="/signout" img="img/signout.svg" text="Sign Out" />
			</nav>
		);
	}
}
