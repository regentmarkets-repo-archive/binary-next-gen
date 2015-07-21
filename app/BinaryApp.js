import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from './actions/TodoActions';

@connect(state => ({ todos: state.todos }))
export default class BinaryApp extends React.Component {
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <h1>Hello World</h1>
                <div {...bindActionCreators(TodoActions, dispatch)} />
            </div>
        );
    }
}
