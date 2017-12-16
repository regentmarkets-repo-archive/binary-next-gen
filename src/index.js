import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import Root from './_store/root';
import storage from './_store/storage';
import '../styles/styles.scss';
import './_utils/validateExtend';

// import { whyDidYouUpdate } from 'why-did-you-update';
// whyDidYouUpdate(React, { exclude: [/^Connect/, /IntlProvider/, /BootProvider/] });

const appName = (/app.binary.com/i.test(window.location.hostname) && 'binary-next-gen') ||
  (window.cordova && 'next-gen-mobile') ||
  '???';
const version = config.version;
const userId = (JSON.parse(storage.getItem('account')) || {}).loginid;

window._trackJs = { // eslint-disable-line no-underscore-dangle
  token: '346262e7ffef497d85874322fff3bbf8',
  application: appName,
  enabled: appName !== '???',
  onError: function (payload) { // eslint-disable-line
    if (payload.message.toLowerCase().indexOf('out of memory') !== -1) {
      window.location.reload();
    }
    payload.customer.userId = userId;
    payload.customer.version = version;
    return true;
  },
};
require('trackjs');

ReactDOM.render(<Root />, document.getElementById('root'));
