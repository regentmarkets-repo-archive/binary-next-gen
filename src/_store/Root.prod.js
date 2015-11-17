import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../_routes/App';
import store from './configureStore';

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
