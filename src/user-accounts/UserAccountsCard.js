import React, { PureComponent } from 'react';
import CreateNewAccount from './CreateNewAccount';
import ExistingAccounts from './ExistingAccounts';

type Props = {
  upgradeInfo: object,
  loginid: string,
  account: any[],
  accounts: any[],
  landingCompany: object,
};

export default class UserAccountsCard extends PureComponent {
  props: Props;

  render() {
    return (
      <div className="user-accounts-card">
        <CreateNewAccount {...this.props} />
        <ExistingAccounts {...this.props} />
      </div>
    );
  }
}
