import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import tradeListSelectors from './tradeListSelectors';
import TradesGrid from './TradesGrid';
import TradesTabs from './TradesTabs';
import JpTradeCard from '../jp-trade/JpTradeCard';

@connect(tradeListSelectors)
export default class TradesContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        tradeMode: PropTypes.string.isRequired,
    };

    static defaultProps = {
        tradeMode: 'grid',
    };

    render() {
        const { tradeMode } = this.props;

        switch (tradeMode) {
            case 'grid': return <TradesGrid {...immutableChildrenToJS(this.props)} />;
            case 'tabs': return <TradesTabs {...immutableChildrenToJS(this.props)} />;
            case 'jp': return <JpTradeCard {...immutableChildrenToJS(this.props)} />;
            default: return null;
        }
    }
}
