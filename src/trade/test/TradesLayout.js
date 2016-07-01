import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeXCardContainer from './TradeXCardContainer';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import * as layouts from '../../layouts';
import styles from '../../layouts/layouts.css';

import { layoutSelector } from './TradeListSelector';

@connect(layoutSelector)
export default class TradesLayouts extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        layoutN: PropTypes.number.isRequired,
        tradesCount: PropTypes.number.isRequired,
        trades: PropTypes.array.isRequired,
    };

    static contextTypes = {
        theme: PropTypes.string,
    };

    componentWillMount() {
        const { actions, layoutN, tradesCount } = this.props;
        actions.changeActiveLayout(tradesCount, layoutN);
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentDidUpdate() {
        windowResizeEvent();
    }

    render() {
        const {
            actions,
            layoutN,
            tradesCount,
            trades,
        } = this.props;

        const { theme } = this.context;

        const layout = layouts[`Layout${tradesCount}${layoutN}`];
        const layoutClass = styles[`layout-${tradesCount}-${layoutN}`];

        if (!layout) return null;

        const tradeComponents =
            trades.map(t => <TradeXCardContainer {...(immutableChildrenToJS(t))} actions={actions} />);

        return layout(tradeComponents, `${styles.trades} ${layoutClass}`);
    }
}

