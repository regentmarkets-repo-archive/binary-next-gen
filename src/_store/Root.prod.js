import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../_routes/App';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
