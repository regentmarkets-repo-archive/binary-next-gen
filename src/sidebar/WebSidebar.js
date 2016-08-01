import React, { PropTypes, PureComponent } from 'react';
import AccountItemsList from './AccountItemsList';
import { M } from 'binary-components';
import { signOut } from '../_data/Auth';

export default class WebSidebar extends PureComponent {

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
		signOut();
	}
	render() {
		const { loginid, email, accounts } = this.props;

		return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
				</div>
				<AccountItemsList loginid={loginid} accounts={accounts} />
				{/* <SidebarBtn to="/deposit" img="img/profit.svg" text="Deposit" /> */}
				<a className="sidebar-btn" onClick={this.onSignOut} >
					<img src="img/signout.svg" role="presentation" />
					<M m="Sign Out" />
				</a>
			</nav>
		);
	}
}
