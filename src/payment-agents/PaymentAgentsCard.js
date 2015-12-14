import React from 'react';
import PaymentAgentsList from './PaymentAgentsList';

export default class PaymentAgentsCard extends React.Component {

    render() {
        return (
            <PaymentAgentsList {...this.props} />
        );
    }
}
