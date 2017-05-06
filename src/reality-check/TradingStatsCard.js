import React, { PureComponent } from 'react';
import { Th } from 'binary-components';

export default class TradingStatsCard extends PureComponent {

    props: {
        loginID: string,
        currency: string,
        turnover: number,
        profitLoss: number,
        contractBought: number,
        contractSold: number,
        openContract: number,
        potentialProfit: number,
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
