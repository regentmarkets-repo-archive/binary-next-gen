import React, { PropTypes } from 'react';
import NumberColored from '../_common/NumberColored';

const profitInPercentage = (buy, sell) => (sell - buy) / buy * 100;
const ContractSoldDetails = ({ buyPrice, soldPrice, transId }) => (
    <div>
        <h3>Trade Confirmation</h3>
        <div>You have sold the following contract.</div>
        <table>
            <thead>
                <tr>
                    <th>Buy Price</th>
                    <th>Sale Price</th>
                    <th>Return</th>
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
        <div>Your transaction reference no is {transId}</div>
    </div>
);

ContractSoldDetails.propTypes = {
    buyPrice: PropTypes.any,
    soldPrice: PropTypes.number,
    transId: PropTypes.string,
};

export default ContractSoldDetails;
