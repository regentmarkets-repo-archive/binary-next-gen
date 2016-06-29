import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './_store/root';
import Perf from 'react-addons-perf';

// import { whyDidYouUpdate } from 'why-did-you-update';
// whyDidYouUpdate(React, { include: [/TradeCard/, /TradeParams/], exclude: [/^Connect/, /IntlProvider/] });

window.performPerfTest = () => {
	Perf.start();
	setTimeout(() => {
		Perf.stop();
		const measurements = Perf.getLastMeasurements();
		Perf.printInclusive(measurements);
		Perf.printWasted(measurements);
	}, 10000);
};

window._trackJs = { // eslint-disable-line no-underscore-dangle
    token: '346262e7ffef497d85874322fff3bbf8',
    application: 'binary-next-gen',
    enabled: window.location.hostname !== 'localhost',
	userId: (JSON.parse(localStorage.getItem('account')) || {}).loginid,
};
require('trackjs');

ReactDOM.render(<Root />, document.getElementById('root'));
