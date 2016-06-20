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
                        <th>
                            <M m="Login ID" />
                        </th>
                        <th>
                            <M m="Currency" />
                        </th>
                        <th>
                            <M m="Turnover" />
                        </th>
                        <th>
                            <M m="Profit/Loss" />
                        </th>
                        <th>
                            <M m="Contract Bought" />
                        </th>
                        <th>
                            <M m="Contract Sold" />
                        </th>
                        <th>
                            <M m="Open Contract" />
                        </th>
                        <th>
                            <M m="Potental Profit" />
                        </th>
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
