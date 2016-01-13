import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fullTradeSelector } from './selectors';
import FullTradeCard from './FullTradeCard';

@connect(fullTradeSelector)
export default class FullTradeContainer extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        selectedAsset: PropTypes.string.isRequired,
        tradingTypeInfo: PropTypes.object.isRequired,
        contractOptions: PropTypes.array.isRequired,
        payoutInfo: PropTypes.object.isRequired,
        ticksInfo: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <FullTradeCard {...this.props} />
        );
    }
}
