import React, { PureComponent } from 'react';
import { getNextAccountTitle, getCurrenciesForNewAccount, filterMarkets, getExistingAccounts } from '../_utils/Client';
import activeMarkets from '../_constants/ActiveMarkets';
import CreateNewAccount from './CreateNewAccount';
import ExistingAccounts from './ExistingAccounts';

type Props = {
  upgradeInfo: object,
  loginid: string,
  account: any[],
  accounts: any[],
  settings: object
};

export default class UserAccountsCard extends PureComponent {
  props: Props;

  render() {
    const { upgradeInfo, account, accounts, settings, loginid } = this.props;
    const nextAccountTitle = getNextAccountTitle(upgradeInfo.typeOfNextAccount);
    const currencyOptions = getCurrenciesForNewAccount(upgradeInfo.currencyOptions, account.currencies_config);
    const markets = filterMarkets(upgradeInfo.allowedMarkets, activeMarkets);
    const existingAccounts = getExistingAccounts(accounts, account.landing_company, activeMarkets);

    return (
      <div className="user-accounts-card">
        <CreateNewAccount loginid={loginid} account={account} upgradeInfo={upgradeInfo} nextAccountTitle={nextAccountTitle} currencyOptions={currencyOptions} settings={settings} markets={markets} />
        <ExistingAccounts loginid={loginid} existingAccounts={existingAccounts} />
      </div>
    );
  }
}
