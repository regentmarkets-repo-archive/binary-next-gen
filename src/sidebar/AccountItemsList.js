import React, { PureComponent } from 'react';
import AccountMenuItem from './AccountMenuItem';
import SidebarBtn from './SidebarBtn';

export default class AccountItemsList extends PureComponent {

	props: {
		loginid: string,
		accounts: Account[],
    landingCompany: object,
    multi: boolean,
    canUpgrade: boolean,
	};

	render() {
    const { loginid, accounts, canUpgrade, multi } = this.props;

    return (
			<div className="account-items-list">
				{canUpgrade && !multi &&
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
