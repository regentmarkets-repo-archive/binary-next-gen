import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HelloMobile from './HelloMobile';
import WebCard from '../web/WebCard';
import { appStateSelector } from '../_selectors/AppStateSelectors';

@connect(appStateSelector)
export default class WebRoot extends Component {
    static propTypes = {
        authorized: PropTypes.bool,
    };

    render() {
        const { authorized } = this.props;
        return (
            authorized ?
                <WebCard /> :
                <HelloMobile />
        );
    }
}

