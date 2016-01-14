import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingView from '../loading-view/LoadingView';

@connect(state => ({ appInfo: state.appInfo.toJS() }))
export default class AppInfoProxy extends Component {
    static propTypes = {
        appInfo: PropTypes.object.isRequired,
        children: PropTypes.object.isRequired,
    };

    render() {
        const { connected } = this.props.appInfo;
        const msg = `
        Connecting...
        If this is taking too long, kindly check your connection.
        `;

        return (connected ? this.props.children : <LoadingView text={msg} shown={!connected}/>);
    }
}
