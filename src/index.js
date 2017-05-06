import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import Perf from 'react-addons-perf';
import config from './config';
import Root from './_store/root';
import storage from './_store/storage';

// import { whyDidYouUpdate } from 'why-did-you-update';
// whyDidYouUpdate(React, { exclude: [/^Connect/, /IntlProvider/, /BootProvider/] });

// window.performPerfTest = () => {
// 	Perf.start();
// 	setTimeout(() => {
// 		Perf.stop();
// 		const measurements = Perf.getLastMeasurements();
// 		Perf.printInclusive(measurements);
// 		Perf.printWasted(measurements);
// 	}, 10000);
// };

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

ReactDOM.render(<Root />, document.getElementById('root'));
