import React, { PureComponent } from 'react';
import { RadioGroup, Button, Legend, P, ServerErrorMsg, LogoSpinner } from 'binary-components';
import { api } from '../_data/LiveData';
import storage from '../_store/storage';
import { getExistingCurrencies, landingCompanyValue, groupCurrencies } from '../_utils/Client';
import cryptoCurrencyConfig from '../_constants/CryptoCurrencyConfig';

export default class SetCurrencyCard extends PureComponent {
  props: {
    accounts: object,
    account: object,
    loginid: string,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected_currency: '',
      progress: false,
      serverError: false,
    };
  }

  getCurrencyOptions = (loginid, landingCompany, accounts, currencyConfig) => {
    let legalAllowedCurrencies = {};
    if (loginid && landingCompany && accounts && currencyConfig) {
      legalAllowedCurrencies = landingCompanyValue(loginid, 'legal_allowed_currencies', landingCompany);
      if (/CR/i.test(loginid)) {
        const existingCurrencies = getExistingCurrencies(accounts);
        if (existingCurrencies.length) {
          const dividedExistingCurrencies = groupCurrencies(existingCurrencies, currencyConfig);
          const hasFiat = dividedExistingCurrencies.fiatCurrencies.length > 0;
          if (hasFiat) {
            const legalAllowedCryptoCurrencies =
              groupCurrencies(legalAllowedCurrencies).cryptoCurrencies;
            const existingCryptoCurrencies = dividedExistingCurrencies.cryptoCurrencies;
            return legalAllowedCryptoCurrencies.filter(x => existingCryptoCurrencies.indexOf(x) === -1);
          }
          return legalAllowedCurrencies.filter(x => existingCurrencies.index(x) === -1);
        }
        return legalAllowedCurrencies;
      }
    }
    return legalAllowedCurrencies;
  }

  populateOptions = (options, currencyConfig, cryptoConfig) => {
    const currencyOptions = [];
    if (options && currencyConfig && cryptoConfig) {
      options.forEach(curr => {
        const currency = currencyConfig[curr];
        const isCryptoCurrency = /crypto/i.test(currencyConfig[curr].type);
        currency.text = curr;
        currency.value = curr;
        currency.group = currency.isCryptoCurrency ? 'cryptoCurrency' : 'fiatCurrency';
        currency.img = `/img/${curr.toLowerCase()}.svg`;
        if (isCryptoCurrency) {
          currency.name = cryptoConfig[curr].name;
        }
        currencyOptions.push(currencyConfig[curr]);
      });
    }
    return currencyOptions;
  };

  setCurrency = (e: SyntheticEvent) => {
    this.setState({ selected_currency: e.target.value });
  };

  submitCurrency = async () => {
    const currency = this.state.selected_currency;
    try {
      this.setState({
        progress: true,
        serverError: false,
      });
      const response = await api.setAccountCurrency(currency);
      const account = JSON.parse(storage.getItem('account'));
      account.currency = response.set_account_currency;
      storage.setItem('account', JSON.stringify(account));
      window.location = window.BinaryBoot.baseUrl;
    } catch (e) {
      this.setState({ serverError: e.error.error.message });
    } finally {
      this.setState({
        progress: false,
      });
    }
    api.setAccountCurrency(this.state.selected_currency);
  }

  render() {
    const { accounts, loginid, account } = this.props;
    const { progress, serverError } = this.state;
    const currencyOptions =
      this.populateOptions(this.getCurrencyOptions(loginid, account.landing_company, accounts, account.currencies_config),
        account.currencies_config, cryptoCurrencyConfig, cryptoCurrencyConfig);

    return (
      <div className="set-currency-card">
        <div className="full-logo">
          <LogoSpinner spinning={progress} />
          <img className="logo-text" src="https://style.binary.com/images/logo/logotype_light.svg" alt="Logo" />
        </div>
        {serverError && <ServerErrorMsg text={serverError} />}
        <Legend text="Select currency" />
        <P text="Please select the currency of this account:" />
        <RadioGroup options={currencyOptions} onChange={this.setCurrency} />
        <Button text="Confirm" disabled={progress} onClick={this.submitCurrency} />
      </div>
    );
  }
}
