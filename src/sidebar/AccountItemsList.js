import React, { PureComponent } from 'react';
import AccountMenuItem from './AccountMenuItem';
import SidebarBtn from './SidebarBtn';

export default class AccountItemsList extends PureComponent {

	props: {
		loginid: string,
		accounts: Account[],
    landingCompany: any[],
	};

  constructor(props) {
    super(props);
    this.state = {
      loginid: props.loginid,
      accounts: props.accounts,
			landingCompany: props.landingCompany,
    };
  }


	render() {
		const { loginid, accounts, landingCompany } = this.state;
		const shouldShowUpgrade = accounts.length < 2;
		console.log(landingCompany);

		return (
			<div className="account-items-list">
				{shouldShowUpgrade &&
					<SidebarBtn to="/upgrade" img="img/icon.png" text="Upgrade" />
				}
				{accounts
					.filter(x => x.account !== loginid)
					.map(x => <AccountMenuItem key={x.token} account={x.account} token={x.token} />)
				}
			</div>
		);
	}
}
