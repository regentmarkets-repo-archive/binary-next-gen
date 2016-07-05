import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HelloMobile from './HelloMobile';
import TradeMobile from '../trade/mobile/TradeMobile';
import { appStateSelector } from '../_selectors/AppStateSelectors';

@connect(appStateSelector)
export default class MobileRoot extends Component {
    static propTypes = {
        authorized: PropTypes.bool,
    };

    render() {
        const { authorized } = this.props;
        return (
            authorized ?
                <TradeMobile /> :
                <HelloMobile />
        );
    }
}
