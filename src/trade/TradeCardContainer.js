import React, { PureComponent } from 'react';
import TradeCard from './TradeCard';

export default class TradeCardContainer extends PureComponent {

    render() {
        return (
            <TradeCard {...this.props} />
        );
    }
}
