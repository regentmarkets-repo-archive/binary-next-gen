import React from 'react';
import { connect } from 'react-redux';
import PaymentAgentsCard from './PaymentAgentsCard';

@connect(state => ({ paymentAgents: state.paymentAgent.get('paymentAgents') }))
export default class PaymentAgentsContainer extends React.Component {
    render() {
        return <PaymentAgentsCard {...this.props} />;
    }
}
