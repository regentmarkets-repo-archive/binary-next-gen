import React from 'react';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from './stores';
import BinaryApp from './BinaryApp';

const redux = createRedux(stores);

export default class App extends React.Component {
    render() {
        return (
            <Provider redux={redux}>
                {() => <BinaryApp />}
            </Provider>
        );
    }
}
