import React, { PureComponent } from 'react';
import { M } from 'binary-components';
import AccountItemsList from './AccountItemsList';
import { signOut } from '../_data/Auth';

type Account = {
	account: string,
	token: string,
};

export default class WebSidebar extends PureComponent {

	props: {
		email: string,
		loginid: string,
		accounts: Account[],
	};

	onSignOut(e: SyntheticEvent) {
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
