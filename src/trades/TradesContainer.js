import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import tradeListSelectors from './tradeListSelectors';
import TradesGrid from './TradesGrid';
import TradesTabs from './TradesTabs';
import JpTradeContainer from '../jp-trade/JpTradeContainer';

@connect(tradeListSelectors)
export default class TradesContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        tradeMode: PropTypes.string.isRequired,
    };

    static defaultProps = {
        tradeMode: 'tabs',
    };

    render() {
        const { tradeMode } = this.props;

        switch (tradeMode) {
            case 'tabs': return <TradesTabs {...immutableChildrenToJS(this.props)} />;
            case 'grid': return <TradesGrid {...immutableChildrenToJS(this.props)} />;
            case 'jp': return <JpTradeContainer {...immutableChildrenToJS(this.props)} />;
            default: return null;
        }
    }
}
