import React, { PropTypes, Component } from 'react';
import AccountMenuItem from './AccountMenuItem';
import M from 'binary-components/lib/M';
import { signout } from '../_data/Auth';

export default class WebSidebar extends Component {

	static propTypes = {
		email: PropTypes.string.isRequired,
		loginid: PropTypes.string.isRequired,
		accounts: PropTypes.arrayOf(PropTypes.shape({
			account: PropTypes.string.isRequired,
			token: PropTypes.string.isRequired,
		})),
	};
	onSignOut(e) {
		e.stopPropagation();
		signout();
	}
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
				<label htmlFor="Sign-Out" onClick={this.onSignOut} className="sidebar-btn">
					<img src="img/signout.svg" role="presentation" />
					<M m="Sign Out" />
				</label>
			</nav>
		);
	}
}
