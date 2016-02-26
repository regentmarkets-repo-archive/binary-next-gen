import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberColored from '../_common/NumberColored';

const profitInPercentage = (buy, sell) => (sell - buy) / buy * 100;

export default class ContractSoldDetails extends Component {

    static propTypes = {
        buyPrice: PropTypes.any,
        soldPrice: PropTypes.number,
        transId: PropTypes.string,
    };

    render() {
        const { buyPrice, soldPrice, transId } = this.props;

        return (
            <div>
                <h3><M m="Trade Confirmation" /></h3>
                <div><M m="You have sold the following contract." /></div>
                <table>
                    <thead>
                        <tr>
                            <th><M m="Buy Price" /></th>
                            <th><M m="Sale Price" /></th>
                            <th><M m="Return" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{buyPrice}</td>
                            <td>{soldPrice}</td>
                            <td><NumberColored value={profitInPercentage(buyPrice, soldPrice)} />%</td>
                        </tr>
                    </tbody>
                </table>
                <div><M m="Your transaction reference no is {transId}" values={{ transId }} /></div>
            </div>
        );
    }
}
