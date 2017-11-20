import React, { PureComponent } from 'react';
import { RadioGroup } from 'binary-components';
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
      selected_currency: ''
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

  render() {
    const { accounts, loginid, account } = this.props;
    const currencyOptions =
      this.populateOptions(this.getCurrencyOptions(loginid, account.landing_company, accounts, account.currencies_config),
        account.currencies_config, cryptoCurrencyConfig, cryptoCurrencyConfig);

    return (
      <div className="set-currency-card">
        <div className="full-logo">
          <img className="logo-text" src="https://style.binary.com/images/logo/logotype_light.svg" alt="Logo" />
        </div>
        <RadioGroup options={currencyOptions} onChange={this.setCurrency} name="currencyselect" />
      </div>
    );
  }
}
