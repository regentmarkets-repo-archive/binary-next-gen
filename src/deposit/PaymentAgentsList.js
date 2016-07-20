import React, { PropTypes, Component } from 'react';
import PaymentAgentsItem from './PaymentAgentsItem';
import Th from 'binary-components/lib/Th';

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
                        <Th text="Payment Agent" />
                        <Th text="Commissions" />
                        <Th text="Banks" />
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
