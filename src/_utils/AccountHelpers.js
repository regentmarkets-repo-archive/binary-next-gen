import storage from '../_store/storage';

export function addNewAccount(newAccountResponse) {
    // Set current account:
    storage.setItem('account', JSON.stringify({ token: newAccountResponse.oauth_token }));

    // Update accounts list:
    const boot = JSON.parse(storage.getItem('boot'));
    boot.accounts.push({
        account: newAccountResponse.client_id,
        token: newAccountResponse.oauth_token,
        currency: newAccountResponse.currency || ''
    });
    storage.setItem('boot', JSON.stringify(boot));
}

export function addCurrencyToAccount(currency, loginid) {
  const account = JSON.parse(storage.getItem('account'));
  account.currency = currency;
  storage.setItem('account', JSON.stringify(account));

  // Update accounts list:
  const boot = JSON.parse(storage.getItem('boot'));
  const accounts = boot.accounts.map(acc => {
      if (acc.account === loginid) acc.currency = currency;
      return acc;
  });
  boot.accounts = accounts;
  storage.setItem('boot', JSON.stringify(boot));
}
