import React, { PropTypes, Component } from 'react';
import M from 'binary-components/lib/M';
import Th from 'binary-components/lib/Th';
import NumberColored from 'binary-components/lib/NumberColored';

const profitInPercentage = (buy, sell) => (sell - buy) / buy * 100;

export default class ContractSoldDetails extends Component {

    static propTypes = {
        buyPrice: PropTypes.any,
        soldPrice: PropTypes.number,
        transId: PropTypes.string,
    };

    render() {
        const { buyPrice, soldPrice, transId } = this.props;
        const profit = profitInPercentage(buyPrice, soldPrice);

        return (
            <div>
                <h3><M m="Trade Confirmation" /></h3>
                <div><M m="You have sold the following contract." /></div>
                <table>
                    <thead>
                        <tr>
                            <Th text="Buy Price" />
                            <Th text="Sale Price" />
                            <Th text="Return" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{buyPrice}</td>
                            <td>{soldPrice}</td>
                            <td><NumberColored value={profit} />%</td>
                        </tr>
                    </tbody>
                </table>
                <div><M m="Your transaction reference no is {transId}" values={{ transId }} /></div>
            </div>
        );
    }
}
