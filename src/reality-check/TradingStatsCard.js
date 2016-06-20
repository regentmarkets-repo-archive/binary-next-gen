import React, { Component, PropTypes } from 'react';
import M from 'binary-components/lib/M';

export default class TradingStatsCard extends Component {
    static propTypes = {
        loginID: PropTypes.string.isRequired,
        currency: PropTypes.string,
        turnover: PropTypes.number.isRequired,
        profitLoss: PropTypes.number.isRequired,
        contractBought: PropTypes.number.isRequired,
        contractSold: PropTypes.number.isRequired,
        openContract: PropTypes.number.isRequired,
        potentialProfit: PropTypes.number.isRequired,
    };

    render() {
        return (
            <div></div>
        );
    }
}
