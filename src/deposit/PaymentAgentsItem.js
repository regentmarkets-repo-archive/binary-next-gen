import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';

const PaymentAgentsItem = ({ paymentAgent }) => (
    <tr>
        <td>{paymentAgent.name}</td>
        <td>
            <div>
                <M m="Deposit commision: " />
                <NumberPlain
                    currency={paymentAgent.currencies}
                    value={paymentAgent.deposit_commission}
                />
            </div>
            <div>
                <M m="Withdrawal commision: " />
                <NumberPlain
                    currency={paymentAgent.currencies}
                    value={paymentAgent.withdrawal_commission}
                />
            </div>
        </td>
        <td>
            Available banks: ...
        </td>
    </tr>
);

PaymentAgentsItem.propTypes = {
    paymentAgent: PropTypes.object.isRequired,
};

export default PaymentAgentsItem;
