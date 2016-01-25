import React, { PropTypes } from 'react';
import PaymentAgentsItem from './PaymentAgentsItem';

export default class PaymentAgentsList extends React.Component {
    static propTypes = {
        paymentAgents: PropTypes.array.isRequired,
    };

    render() {
        const { paymentAgents } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        <th>Payment Agent</th>
                        <th>Commissions</th>
                        <th>Banks</th>
                    </tr>
                </thead>
                <tbody>
                    { paymentAgents.map(pa => <PaymentAgentsItem key={pa.name} paymentAgent={pa}/>) }
                </tbody>
            </table>
        );
    }
}
