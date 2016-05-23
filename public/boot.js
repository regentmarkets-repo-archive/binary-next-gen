(function init() {
    const defaultConfig = {
        language: 'EN',
        theme: 'light',
        accounts: [],
    };

    function parseOAuthResponse(responseUrl) {
        const matcher = /acct\d=(\w+)&token\d=([\w-]+)/g;
        let urlParts = responseUrl.split('/redirect?');
        if (urlParts.length !== 2) {
            urlParts = responseUrl.split('/redirect%23'); // workaround for server bug
        }
        if (urlParts.length !== 2) {
            throw new Error('Not a valid url');
        }

        const params = urlParts[1].split(matcher);

        const accounts = [];

        for (let i = 1; i < params.length; i += 3) {
            accounts.push({
                account: params[i],
                token: params[i + 1],
            });
        }

        return accounts;
    }

    function readConfig() {
        try {
            window.BinaryBoot = JSON.parse(localStorage.getItem('boot')) || defaultConfig;
        } catch (e) {
            window.BinaryBoot = defaultConfig;
            window.console.log('Error while initializing', e);
        }
    }

    function parseUrl() {
        if (~window.location.href.indexOf('acct1')) {
            const accounts = parseOAuthResponse(window.location.href);
            window.BinaryBoot.accounts = accounts;
            try {
                localStorage.setItem('boot', JSON.stringify(window.BinaryBoot));
                localStorage.setItem('account', JSON.stringify({ token: accounts[0].token }));
            } catch (e) {
                window.console.log('Error while saving boot config', e);
            }
        }
    }

    const appId = 1006;
    const apiUrl = 'wss://ws.binaryws.com/websockets/v3';

    readConfig();
    parseUrl();

    const lang = window.BinaryBoot.language;
    const oauthUrl = 'https://oauth.binary.com/oauth2/authorize?app_id=' + appId + '&l=' + lang;

    if (!window.BinaryBoot.accounts || window.BinaryBoot.accounts.length === 0) {
        window.location = oauthUrl;
    }

    window.BinaryBoot.connection = new WebSocket(apiUrl + '?app_id=1006&l=' + lang);
}());
