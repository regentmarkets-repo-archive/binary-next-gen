import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeXCardContainer from '../TradeXCardContainer';
import * as layouts from '../../layouts';
import styles from '../../layouts/layouts.css';

import { layoutSelector } from './LayoutSelector';

@connect(layoutSelector)
export default class TradesLayouts extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        layoutN: PropTypes.number.isRequired,
        tradesCount: PropTypes.number.isRequired,
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
        } = this.props;

        const layout = layouts[`Layout${tradesCount}${layoutN}`];
        const layoutClass = styles[`layout-${tradesCount}-${layoutN}`];

        if (!layout) return null;

        const tradeComponents = (new Array(tradesCount).fill(0))
            .map((zero, idx) => <TradeXCardContainer index={idx} actions={actions} />);

        return layout(tradeComponents, `${styles.trades} ${layoutClass}`);
    }
}

