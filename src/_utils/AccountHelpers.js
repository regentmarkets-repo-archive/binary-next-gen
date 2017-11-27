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
