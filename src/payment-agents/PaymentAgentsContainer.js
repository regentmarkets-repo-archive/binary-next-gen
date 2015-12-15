import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PaymentAgentsCard from './PaymentAgentsCard';

@connect(state => ({ paymentAgents: state.paymentAgent.get('paymentAgents') }))
export default class PaymentAgentsContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return <PaymentAgentsCard {...this.props} />;
    }
}
