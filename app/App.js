import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import BinaryApp from './BinaryApp';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {() => <BinaryApp />}
            </Provider>
        );
    }
}
