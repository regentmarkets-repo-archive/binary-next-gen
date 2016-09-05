import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { windowResizeEvent } from 'binary-utils';
import TradeCardContainer from '../TradeCardContainer';
import * as layouts from '../../layouts';
import styles from '../../layouts/layouts.css';

import { layoutSelector } from './LayoutSelector';

@connect(layoutSelector)
export default class TradesLayouts extends PureComponent {

    static propTypes = {
        layoutN: PropTypes.number.isRequired,
        tradesCount: PropTypes.number.isRequired,
    };

    static contextTypes = {
        theme: PropTypes.string,
    };

    componentDidUpdate() {
        windowResizeEvent();
    }

    render() {
        const { layoutN, tradesCount } = this.props;

        const layout = layouts[`Layout${tradesCount}${layoutN}`];
        const layoutClass = styles[`layout-${tradesCount}-${layoutN}`];

        if (!layout) return null;

        const tradeComponents = (new Array(tradesCount).fill(0))
            .map((zero, idx) => <TradeCardContainer index={idx} />);

        return layout(tradeComponents, `${styles.trades} ${layoutClass}`);
    }
}
