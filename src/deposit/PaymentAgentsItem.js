import React, { PureComponent } from 'react';
import { M, NumberPlain } from 'binary-components';

export default class PaymentAgentsItem extends PureComponent {
    props: {
        paymentAgent: object,
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
