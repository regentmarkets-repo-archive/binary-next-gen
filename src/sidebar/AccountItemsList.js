import React, { PureComponent } from 'react';
import AccountMenuItem from './AccountMenuItem';
import SidebarBtn from './SidebarBtn';

export default class AccountItemsList extends PureComponent {

	props: {
		loginid: string,
		accounts: Account[],
	};

	render() {
		const { loginid, accounts } = this.props;
		const shouldShowUpgrade = accounts.length < 2;

		return (
			<div className="account-items-list">
				{shouldShowUpgrade &&
					<SidebarBtn to="/upgrade" img="img/icon.png" text="Upgrade" />
				}
				{accounts
					.filter(x => x.account !== loginid)
					.map(x => <AccountMenuItem key={x.token} account={x.account} token={x.token} currency={x.currency} />)
				}
			</div>
		);
	}
}
