import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import Root from './_store/root';
import storage from './_store/storage';
import Device from './_utils/Device';
import '../styles/styles.scss';
import './_utils/validateExtend';

// import { whyDidYouUpdate } from 'why-did-you-update';
// whyDidYouUpdate(React, { exclude: [/^Connect/, /IntlProvider/, /BootProvider/] });

const appName = window.location.hostname === 'app.binary.com' && 'binary-next-gen' ||
    window.cordova && 'next-gen-mobile' ||
    '???';
window._trackJs = { // eslint-disable-line no-underscore-dangle
    token: '346262e7ffef497d85874322fff3bbf8',
    application: appName,
    enabled: appName !== '???',
    version: config.version,
	userId: (JSON.parse(storage.getItem('account')) || {}).loginid,
    onError: function (payload) { // eslint-disable-line
        if (payload.message.toLowerCase().indexOf('out of memory') !== -1) {
            window.location.reload();
        }
        return false;
    },
};
require('trackjs');

// In iOS safari the bottom menu bar obstructs the content.
// This little snippet below just allocates some space for it.
if (Device.isIOSSafari()) {
    document.body.style.paddingBottom = '4.4em';
}

// A hack to prevent viewport from being squeezed when keyboard
// pops up. Only affects android browsers.
if (Device.isAndroid()) {
    const viewport = document.querySelector('meta[name=viewport]');
    viewport.setAttribute('content', 'height=' + window.outerHeight + ', width=' + window.outerWidth + ', initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no');
}

ReactDOM.render(<Root />, document.getElementById('root'));
