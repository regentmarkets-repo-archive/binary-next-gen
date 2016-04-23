import React, { PropTypes, Component } from 'react';
import PaymentAgentsItem from './PaymentAgentsItem';
import M from '../_common/M';

export default class PaymentAgentsList extends Component {
    static propTypes = {
        paymentAgent: PropTypes.object.isRequired,
    };

    render() {
        const { paymentAgents } = this.props.paymentAgent;
        return (
            <table>
                <thead>
                    <tr>
                        <th><M m="Payment Agent" /></th>
                        <th><M m="Commissions" /></th>
                        <th><M m="Banks" /></th>
                    </tr>
                </thead>
                <tbody>
                    {paymentAgents.map(pa =>
                        <PaymentAgentsItem key={pa.name} paymentAgent={pa} />
                    )}
                </tbody>
            </table>
        );
    }
}
