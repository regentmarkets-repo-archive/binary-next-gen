import React, { PropTypes } from 'react';
import M from '../_common/M';
import NumberColored from '../_common/NumberColored';

const profitInPercentage = (buy, sell) => (sell - buy) / buy * 100;

const ContractSoldDetails = ({ buyPrice, soldPrice, transId }) => (
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

ContractSoldDetails.propTypes = {
    buyPrice: PropTypes.any,
    soldPrice: PropTypes.number,
    transId: PropTypes.string,
};

export default ContractSoldDetails;
