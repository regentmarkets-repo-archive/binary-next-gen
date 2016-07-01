import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeXCardContainer from './TradeXCardContainer';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import { allTradesSelector } from './TradeListSelector';

@connect(state => ({ trades: allTradesSelector(state) }))
export default class ManyTrade extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { actions, trades } = this.props;
        return (
            <div>
                {trades.map(t => <TradeXCardContainer {...(immutableChildrenToJS(t))} actions={actions} />)}
            </div>
        );
    }
}
