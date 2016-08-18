/* eslint-disable */
'use strict';

(function init() {
    // clean stale data in local storage
    localStorage.removeItem('assets');
    localStorage.removeItem('settings');

    var defaultConfig = {
        language: 'EN',
        theme: 'light',
        accounts: []
    };

    function parseOAuthResponse(responseUrl) {
        var matcher = /acct\d=(\w+)&token\d=([\w-]+)/g;
        var urlParts = responseUrl.split('?');
        if (urlParts.length !== 2) {
            throw new Error('Not a valid url');
        }

        var params = urlParts[1].split(matcher);

        var accounts = [];

        for (var i = 1; i < params.length; i += 3) {
            accounts.push({
                account: params[i],
                token: params[i + 1]
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

    function parseUrlAndStoreAccountInfo(url) {
        if (~url.indexOf('acct1')) {
            var accounts = parseOAuthResponse(url);
            window.BinaryBoot.accounts = accounts;
            try {
                localStorage.setItem('boot', JSON.stringify(window.BinaryBoot));
                localStorage.setItem('account', JSON.stringify({ token: accounts[0].token }));
            } catch (e) {
                window.console.log('Error while saving boot config', e);
            }
        }
    }


    var apiUrl = 'wss://ws.binaryws.com/websockets/v3';

    readConfig();
    parseUrlAndStoreAccountInfo(window.location.href);
    window.BinaryBoot.parseUrl = parseOAuthResponse;
    window.BinaryBoot.appId = window.cordova ? 1006 : 1001;
    var lang = window.BinaryBoot.language;

    var redirectIndex = window.location.href.indexOf('?');
    if (~redirectIndex) {
        location.replace(window.location.href.substr(0, redirectIndex - 1));
    }

    window.BinaryBoot.connection = new WebSocket(apiUrl + '?app_id=' + window.BinaryBoot.appId + '&l=' + lang);
})();
