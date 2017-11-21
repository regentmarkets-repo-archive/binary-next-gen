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

    const getDefaultAppId = () => {
      if(window.cordova) {
        window.BinaryBoot.appId = 1006;
      } else if(window.electron) {
        window.BinaryBoot.appId = 1306;
      } else if (/localhost:/g.test(window.location.href)) {
        window.BinaryBoot.appId = 3588;
      } else if (/arnabk.github.io:/g.test(window.location.href)) {
        window.BinaryBoot.appId = 3604;
      } else if (window.BinaryBoot.isBeta) {
        window.BinaryBoot.appId = 4343; //This is for BETA release
      }
      localStorage.setItem('config.default_app_id', window.BinaryBoot.appId);
      return window.BinaryBoot.appId;
    };

  const getAppId = () =>
    window.localStorage.getItem('config.app_id') || getDefaultAppId() || 1001;

  const getSocketURL = () => {
    let server_url = window.localStorage.getItem('config.server_url');
    if (!server_url) {
      let server = 'frontend';
      server_url = `${server}.binaryws.com`;
    }
    return `wss://${server_url}/websockets/v3`;
  };

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

    window.BinaryBoot.oAuthUrl = defaultConfig.oAuthUrl;
    window.BinaryBoot.apiUrl = defaultConfig.apiUrl;

      try {
        // var config = JSON.parse(testConfig) || { };
        const serverURL = localStorage.getItem('config.server_url');
        window.BinaryBoot.appId = getAppId();
        window.BinaryBoot.apiUrl = serverURL ? `wss://${serverURL}/websockets/v3` : getSocketURL();
        window.BinaryBoot.oAuthUrl = config.oAuthUrl || window.BinaryBoot.oAuthUrl;
      } catch (e) { }

    window.BinaryBoot.connection = new WebSocket(window.BinaryBoot.apiUrl + '?app_id=' + window.BinaryBoot.appId + '&l=' + lang);
})();
