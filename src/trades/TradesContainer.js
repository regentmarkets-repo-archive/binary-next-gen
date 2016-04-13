import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import tradeListSelectors from './tradeListSelectors';
import TradesGrid from './TradesGrid';
import TradesTabs from './TradesTabs';

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

        return tradeMode === 'tabs' ?
            <TradesTabs {...immutableChildrenToJS(this.props)} /> :
            <TradesGrid {...immutableChildrenToJS(this.props)} />;
    }
}
