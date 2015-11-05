import React from 'react';
import { connect } from 'react-redux';
import StateStorage from '../_store/StateStorage';

@connect(state => ({greet: state.greet, subject: state.subject}))
export default class HelloWorldPanel extends React.Component {
    static propTypes = {
        color: String,
        greet: String,
        subject: String
    }

    render() {
        return
        <div>
            <p>{this.props.greet + " " + this.props.subject}</p>
        </div>
    }
}
