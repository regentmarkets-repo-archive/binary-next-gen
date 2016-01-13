import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingView from '../loading-view/LoadingView';

@connect(state => ({ appInfo: state.appInfo }))
export default class AppInfoProxy extends Component {
    static propTypes = {
        appInfo: PropTypes.object.isRequired,
        children: PropTypes.object,
    };

    render() {
        const { connected } = this.props.appInfo.toJS();
        const msg = `
        Connecting...
        If this is taking too long, kindly check your connection.
        `;

        return (!!connected ? React.Children.only(this.props.children) : <LoadingView text={msg}/>);
    }
}
