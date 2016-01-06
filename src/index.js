import React from 'react';
import ReactDOM from 'react-dom';
import { rehydratedStorePromise } from './_store/configureStore';
import * as LiveData from './_data/LiveData';
import { tryAuth } from './_data/Auth';
import Root from './_store/root';

rehydratedStorePromise.then(st => {
    LiveData.connect(st);
    tryAuth(st)
        .then(() => ReactDOM.render(<Root/>, document.getElementById('root')))
        .catch(() => ReactDOM.render(<Root/>, document.getElementById('root')));
});
