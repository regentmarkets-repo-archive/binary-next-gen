import 'babel-polyfill';
import { epochToDateString } from 'binary-utils';
import cryptoCurrencyConfig from '../_constants/CryptoCurrencyConfig';

// get all loginids ** note: is going to be replaced by backend soon
export const getAllLoginids = (accounts) => {
  const allLoginids = [];
  if (accounts) {
    accounts.forEach((acc) => {
      allLoginids.push(acc.account);
    });
  }
  return allLoginids;
};

// get the type of account from loginid with this function
export const getAccountType = loginid => {
  let account_type;
  if (/VR/i.test(loginid)) account_type = 'Virtual';
  else if (/MF/i.test(loginid)) account_type = 'Investment';
  else if (/MLT/i.test(loginid)) account_type = 'Gaming';
  else account_type = 'Real';
  return account_type;
};

// account is of type or not
export const isAccountOfType = (type, loginid) => {
  const accountType = getAccountType(loginid);
  return (
    (type === 'virtual' && accountType === 'Virtual') ||
    (type === 'real' && accountType !== 'Virtual') ||
    type === accountType);
};

// search through all loginids and return loginid of the account which has this type
export const getAccountOfType = (type, accounts) => {
  const allLoginids = getAllLoginids(accounts);
  const id = allLoginids.find(loginid => isAccountOfType(type, loginid));
  return id;
};

// to check if user has account with this type
export const hasAccountOfType = (type, accounts) => !!getAccountOfType(type, accounts);

// to get values of keys we want from landingCompany object
export const landingCompanyValue = (loginid, key, landingCompany) => {
  let landingCompanyOfAccount;
  const landingCompanyObject = landingCompany;
  if (isAccountOfType('financial', loginid)) {
    landingCompanyOfAccount = landingCompanyObject.financial_company;
  } else if (isAccountOfType('real', loginid)) {
    landingCompanyOfAccount = landingCompanyObject.gaming_company;
    if (!landingCompanyOfAccount) {
      landingCompanyOfAccount = landingCompanyObject.financial_company;
    }
  } else {
    const financialCompany = (landingCompanyObject.financial_company || {})[key] || [];
    const gamingCompany = (landingCompanyObject.gaming_company || {})[key] || [];
    landingCompanyOfAccount = financialCompany.concat(gamingCompany);
    return landingCompanyOfAccount;
  }
  return (landingCompanyOfAccount || {})[key];
};

// for getting the title of next account user can upgrade to (Real, Financial)
export const getNextAccountTitle = (typeOfNextAccount) => {
  let nextAccount;
  if (typeOfNextAccount === 'Real') {
    nextAccount = 'Real Account';
  } else if (typeOfNextAccount === 'Investment') {
    nextAccount = 'Financial Account';
  }
  return nextAccount;
};

// get the currencies user already has
export const getExistingCurrencies = (accounts) => {
  const accountsArray = Object.values(accounts);
  const currencies = (accountsArray.filter(account => !/VR/i.test(account.account) && account.currency && account.currency.length > 0)).map(account => account.currency);

  return currencies;
};

// divide currencies between fiat currency and cryptocurrency based on their type in currencies_config
export const groupCurrencies = (currencies, currencyConfig) => {
  const cryptoCurrencies = [];
  const fiatCurrencies = [];
  if (currencies && Object.keys(currencies).length && currencyConfig && Object.keys(currencyConfig).length) {
    currencies.forEach(curr => {
      const currency = currencyConfig[curr];
      const isCryptoCurrency = /crypto/i.test(currency.type);
      if (isCryptoCurrency) {
        cryptoCurrencies.push(curr);
      } else {
        fiatCurrencies.push(curr);
      }
    });
  }
  return {
    cryptoCurrencies,
    fiatCurrencies
  };
};

// for now we have some available markets and we have to filter user legalAllowedMarkets and return markets which are available
// this is going to be fixed by BackEnd
export const filterMarkets = (markets, activeMarkets) => {
  let availableMarkets = [];
  if (markets) {
    markets.forEach((market) => {
      if (market in activeMarkets && availableMarkets.indexOf(activeMarkets[market]) < 0) {
        availableMarkets.push(activeMarkets[market]);
      }
    });
    availableMarkets = availableMarkets.join(', ');
  }
  return availableMarkets;
};

// for getting currencies available for next account user can upgrade to.
// also group them in fiat currency and cryptocurrency to have optgroup select
export const getCurrenciesForNewAccount = (currencies, currencyConfig) => {
  const currencyOptions = [];
  if (currencies && currencyConfig) {
    currencies.forEach((curr) => {
      const currencyObject = {};
      currencyObject.text = curr;
      currencyObject.value = curr;
      currencyObject.group = /crypto/i.test(currencyConfig[curr].type) ?
        'Cryptocurrency' : 'Fiat Currency';
      if (currencyOptions.indexOf(currencyObject) < 0) {
        currencyOptions.push(currencyObject);
      }
    });
  }
  return currencyOptions;
};

// this function gives all account user has, with available markets, type of account, currency and loginid
// for each of them.
export const getExistingAccounts = (allAccounts, landingCompany, activeMarkets) => {
  const existingAccounts = [];
  if (allAccounts && landingCompany) {
    allAccounts.forEach((acc) => {
      const userAccount = {};
      userAccount.id = acc.account;
      userAccount.is_disabled = acc.is_disabled;
      userAccount.excluded_until = acc.excluded_until ? epochToDateString(acc.excluded_until) : false;
      const allowedMarkets = landingCompanyValue(userAccount.id, 'legal_allowed_markets', landingCompany);
      userAccount.availableMarkets = filterMarkets(allowedMarkets, activeMarkets);
      userAccount.type = getAccountType(userAccount.id);
      userAccount.currency = acc.currency;
      existingAccounts.push(userAccount);
    });
  }
  return existingAccounts;
};

// get the currencies user can select for this account,it's used in populateCurrencyOptions
const getCurrencyOptions = (loginid, landingCompany, accounts, currencyConfig) => {
    const legalAllowedCurrencies = landingCompanyValue(loginid, 'legal_allowed_currencies', landingCompany);
    if (/CR/i.test(loginid)) {
      const existingCurrencies = getExistingCurrencies(accounts);
      if (existingCurrencies.length) {
        const dividedExistingCurrencies = groupCurrencies(existingCurrencies, currencyConfig);
        const hasFiat = dividedExistingCurrencies.fiatCurrencies.length > 0;
        if (hasFiat) {
          const legalAllowedCryptoCurrencies =
            groupCurrencies(legalAllowedCurrencies, currencyConfig).cryptoCurrencies;
          const existingCryptoCurrencies = dividedExistingCurrencies.cryptoCurrencies;
          return legalAllowedCryptoCurrencies.filter(x => existingCryptoCurrencies.indexOf(x) === -1);
        }
        return legalAllowedCurrencies.filter(x => existingCurrencies.indexOf(x) === -1);
      }
      return legalAllowedCurrencies;
    }
  return legalAllowedCurrencies;
};

// populate currencies and image of currency user can select for account they are already loggedin with
export const populateCurrencyOptions = (loginid, accounts, landingCompany, currencyConfig) => {
  const currencyOptions = [];
  if (landingCompany && Object.keys(landingCompany).length && currencyConfig && Object.keys(currencyConfig).length) {
    const options = getCurrencyOptions(loginid, landingCompany, accounts, currencyConfig);
      if (options) {
          options.forEach(curr => {
              const currency = currencyConfig[curr];
              const isCryptoCurrency = /crypto/i.test(currencyConfig[curr].type);
              currency.text = curr;
              currency.value = curr;
              currency.group = isCryptoCurrency ? 'Cryptocurrency' : 'Fiat currency';
              currency.img = `/img/${curr.toLowerCase()}.svg`;
              if (isCryptoCurrency) {
                  currency.name = cryptoCurrencyConfig[curr].name;
              }
              currencyOptions.push(currencyConfig[curr]);
          });
      }
  }

  return currencyOptions;
};
