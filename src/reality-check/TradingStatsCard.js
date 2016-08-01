import React, { PureComponent, PropTypes } from 'react';
import { Th } from 'binary-components';

export default class TradingStatsCard extends PureComponent {

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
        const {
            loginID,
            currency,
            turnover,
            profitLoss,
            contractBought,
            contractSold,
            openContract,
            potentialProfit,
        } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <Th text="Login ID" />
                        <Th text="Currency" />
                        <Th text="Turnover" />
                        <Th text="Profit/Loss" />
                        <Th text="Contract Bought" />
                        <Th text="Contract Sold" />
                        <Th text="Open Contract" />
                        <Th text="Potental Profit" />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{loginID}</td>
                        <td>{currency}</td>
                        <td>{turnover}</td>
                        <td>{profitLoss}</td>
                        <td>{contractBought}</td>
                        <td>{contractSold}</td>
                        <td>{openContract}</td>
                        <td>{potentialProfit}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
