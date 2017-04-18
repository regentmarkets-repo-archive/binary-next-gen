import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TradeCard from '../TradeCard';

import trades from '../TradeSelectors';

type Props = {
    trade: Object,
};

@connect(state => ({ trade: trades(state).first() }))
export default class MobileTradeContainer extends PureComponent {
    props: Props;

    render() {
        const { trade } = this.props;
        return <TradeCard {...this.props} {...trade} />;
    }
}
