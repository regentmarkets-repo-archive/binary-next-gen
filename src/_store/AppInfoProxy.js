import React, { Component, PropTypes, Children } from 'react';
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
        //console.log(this.props);
        return (connected ?
            Children.only(this.props.children) :
            <LoadingView text={'Connecting taking too long, you might be offline.'}/>);
    }
}
