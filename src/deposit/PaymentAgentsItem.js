import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';

export default class PaymentAgentsItem extends Component {

    static propTypes = {
        paymentAgent: PropTypes.object.isRequired,
    };

    render() {
        const { paymentAgent } = this.props;

        return (
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
                    {paymentAgent.supported_banks}
                </td>
            </tr>
        );
    }
}
