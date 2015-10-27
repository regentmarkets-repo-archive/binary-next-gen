import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../_routes/App';
import DevTools from './DevTools';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        console.log('store', store);
        return (
            <Provider store={store}>
                <div>
                    <App />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}
