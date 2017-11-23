/* eslint-disable */
'use strict';

(function init() {
    // clean stale data in local storage
    localStorage.removeItem('assets');
    localStorage.removeItem('settings');

    var defaultConfig = {
        language: 'EN',
        theme: 'light',
        apiUrl: 'wss://frontend.binaryws.com/websockets/v3',
        oAuthUrl: 'https://oauth.binary.com/oauth2/authorize',
        accounts: []
    };

    function getDefaultAppId() {
        var defaultAppID;
        if(window.cordova) {
          defaultAppID = 1006;
        } else if(window.electron) {
          defaultAppID = 1306;
        } else if (/localhost:/g.test(window.location.href)) {
          defaultAppID = 3588;
        } else if (/arnabk.github.io:/g.test(window.location.href)) {
          defaultAppID = 3604;
        } else if (/beta/g.test(window.location.href)) {
          defaultAppID = 4343; //This is for BETA release
        } else {
          defaultAppID = 1001; //This is for PROD release
        }
        localStorage.setItem('config.default_app_id', defaultAppID);
        return defaultAppID;
    };

    function getAppId() {
      return window.localStorage.getItem('config.app_id') || getDefaultAppId();
    }

    function getSocketURL () {
        var server_url = window.localStorage.getItem('config.server_url');
        if (!server_url) {
            var server = 'frontend';
            server_url = server + '.binaryws.com';
        }
        return 'wss://' + server_url + '/websockets/v3';
    };

    function getoAuthURL(appId) {
        var server_url = window.localStorage.getItem('config.server_url');
        if (!server_url) {
          return defaultConfig.oAuthUrl;
        } else {
          return 'https://' + server_url + '/oauth2/authorize';
        }
    }

    function parseOAuthResponse(responseUrl) {
        var urlParts = responseUrl.split('?');
        if (urlParts.length !== 2) {
            throw new Error('Not a valid url');
        }

        var objURL = {};
        responseUrl.replace(
            new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
            function( $0, $1, $2, $3 ){
                objURL[ $1 ] = $3;
            }
        );

        var accounts = [];
        for(var i = 1;; i++) {
            var account = objURL['acct' + i],
                token = objURL['token' + i],
                currency = objURL['cur' + i];
            if (!account || !token) break;
            accounts.push({ account: account, token: token, currency : currency || '', });
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

    readConfig();
    parseUrlAndStoreAccountInfo(window.location.href);
    window.BinaryBoot.parseUrl = parseOAuthResponse;
    window.BinaryBoot.isBeta = /beta/g.test(window.location.href);
    window.BinaryBoot.baseUrl = window.BinaryBoot.isBeta ? '/beta' : '/';
    var lang = window.BinaryBoot.language;

    var redirectIndex = window.location.href.indexOf('?');
    if (~redirectIndex) {
        window.location.href = window.BinaryBoot.baseUrl;
    }

    // window.BinaryBoot.oAuthUrl = defaultConfig.oAuthUrl;
    // window.BinaryBoot.apiUrl = defaultConfig.apiUrl;

    try {
        // var config = JSON.parse(testConfig) || { };
        window.BinaryBoot.appId = getAppId();
        window.BinaryBoot.apiUrl = getSocketURL();
        window.BinaryBoot.oAuthUrl = getoAuthURL(window.BinaryBoot.appId);
    } catch (e) { }

    window.BinaryBoot.connection = new WebSocket(window.BinaryBoot.apiUrl + '?app_id=' + window.BinaryBoot.appId + '&l=' + lang);
})();
