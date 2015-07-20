import React from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'redux/react';
import * as TodoActions from './actions/TodoActions';

export default class TodoApp extends React.Component {
    render() {
        return (
            <Connector select={state => ({ todos: state.todos })}>
                {this.renderChild}
            </Connector>
        );
    }

    renderChild({ todos, dispatch }) {
        const actions = bindActionCreators(TodoActions, dispatch);
        return (
            <div>
            </div>
        );
    }
}
