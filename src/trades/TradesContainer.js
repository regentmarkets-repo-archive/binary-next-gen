import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import tradeListSelectors from './tradeListSelectors';
import TradesGrid from './TradesGrid';
import TradesTabs from './TradesTabs';

@connect(tradeListSelectors)
export default class TradesContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        tradeMode: PropTypes.string.isRequired,
    };

    static defaultValues = {
        tradeMode: 'grid',
    };

    render() {
        const { tradeMode } = this.props;

        return tradeMode === 'grid' ?
            <TradesGrid {...immutableChildrenToJS(this.props)} /> :
            <TradesTabs {...immutableChildrenToJS(this.props)} />;
    }
}
