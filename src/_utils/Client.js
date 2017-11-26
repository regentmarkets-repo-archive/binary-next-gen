import cryptoCurrencyConfig from '../_constants/CryptoCurrencyConfig';

export const getAllLoginids = (accounts) => {
  const allLoginids = [];
  if (accounts) {
    accounts.forEach((acc) => {
      allLoginids.push(acc.account);
    });
  }
  return allLoginids;
};

export const getAccountType = loginid => {
  let account_type;
  if (/VR/i.test(loginid)) account_type = 'virtual';
  else if (/MF/i.test(loginid)) account_type = 'financial';
  else if (/MLT/i.test(loginid)) account_type = 'gaming';
  else account_type = 'real';
  return account_type;
};

export const isAccountOfType = (type, loginid) => {
  const accountType = getAccountType(loginid);
  return (
    (type === 'virtual' && accountType === 'virtual') ||
    (type === 'real' && accountType !== 'virtual') ||
    type === accountType);
};

export const getAccountOfType = (type, accounts) => {
  const allLoginids = getAllLoginids(accounts);
  const id = allLoginids.find(loginid => isAccountOfType(type, loginid));
  return id;
};

export const hasAccountOfType = (type, accounts) => !!getAccountOfType(type, accounts);

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

export const getNextAccountTitle = (typeOfNextAccount) => {
  let nextAccount;
  if (typeOfNextAccount === 'real') {
    nextAccount = 'Real Account';
  } else if (typeOfNextAccount === 'financial') {
    nextAccount = 'Financial Account';
  }
  return nextAccount;
};

export const getExistingCurrencies = (accounts) => {
  const accountsArray = Object.values(accounts);
  const currencies = (accountsArray.filter(account => !/VR/i.test(account.account) && account.currency.length > 0)).map(account => account.currency);

  return currencies;
};

export const groupCurrencies = (currencies, currencyConfig) => {
  const cryptoCurrencies = [];
  const fiatCurrencies = [];
  currencies.forEach(curr => {
    const currency = currencyConfig[curr];
    const isCryptoCurrency = /crypto/i.test(currency.type);
    if (isCryptoCurrency) {
      cryptoCurrencies.push(curr);
    } else {
      fiatCurrencies.push(curr);
    }
  });
  return {
    cryptoCurrencies,
    fiatCurrencies
  };
};

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

export const getCurrenciesForNewAccount = (currencies, currencyConfig) => {
  const currencyOptions = [];
  if (currencies) {
    currencies.forEach((curr) => {
      const currencyObject = {};
      currencyObject.text = curr;
      currencyObject.value = curr;
      currencyObject.group = /crypto/i.test(currencyConfig[curr].type) ?
        'Cryptocurrencies' : 'Fiat currencies';
      if (currencyOptions.indexOf(currencyObject) < 0) {
        currencyOptions.push(currencyObject);
      }
    });
  }
  return currencyOptions;
};

export const getExistingAccounts = (allAccounts, landingCompany, loginid, activeMarkets) => {
  const existingAccounts = [];
  if (allAccounts && landingCompany) {
    allAccounts.forEach((acc) => {
      const userAccount = {};
      userAccount.id = acc.account;
      const allowedMarkets = landingCompanyValue(userAccount.id, 'legal_allowed_markets', landingCompany);
      userAccount.availableMarkets = filterMarkets(allowedMarkets, activeMarkets);
      userAccount.type = getAccountType(userAccount.id);
      userAccount.currency = acc.currency;
      existingAccounts.push(userAccount);
    });
  }
  return existingAccounts;
};

const getCurrencyOptions = (loginid, landingCompany, accounts, currencyConfig) => {
    const legalAllowedCurrencies = landingCompanyValue(loginid, 'legal_allowed_currencies', landingCompany);
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
  return legalAllowedCurrencies;
};

export const populateCurrencyOptions = (account, loginid, accounts, landingCompany, currencyConfig) => {
  const options = getCurrencyOptions(loginid, landingCompany, accounts, currencyConfig);
  const currencyOptions = [];
    options.forEach(curr => {
      const currency = currencyConfig[curr];
      const isCryptoCurrency = /crypto/i.test(currencyConfig[curr].type);
      currency.text = curr;
      currency.value = curr;
      currency.group = currency.isCryptoCurrency ? 'cryptoCurrency' : 'fiatCurrency';
      currency.img = `/img/${curr.toLowerCase()}.svg`;
      if (isCryptoCurrency) {
        currency.name = cryptoCurrencyConfig[curr].name;
      }
      currencyOptions.push(currencyConfig[curr]);
    });
  return currencyOptions;
};
