// import React from 'react';
// import { Provider } from 'react-redux';
// import { Router } from 'react-router';
// import HashHistory from 'history/lib/createHashHistory';
// import routes from '../_routes';
// import LiveData from '../_data/LiveData';
// import configureStore from './configureStore';

// const store = configureStore();

// export default class Root extends React.Component {
//     render() {
//         const history = new HashHistory();
//         const liveData = new LiveData(store);
//         liveData.initUnauthorized();
//         return (
//             <div>
//                 <Provider store={store}>
//                     <Router history={history} children={routes} />
//                 </Provider>
//             </div>
//         );
//     }
// }

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod');
} else {
    module.exports = require('./Root.dev');
}
