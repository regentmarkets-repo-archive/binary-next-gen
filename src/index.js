import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './_store/root';

window._trackJs = { // eslint-disable-line no-underscore-dangle
    token: '346262e7ffef497d85874322fff3bbf8',
    application: 'binary-next-gen',
    enabled: window.location.hostname !== 'localhost',
};

ReactDOM.render(<Root />, document.getElementById('root'));
