import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { getSettings } from '../_reducers/SettingsReducers';
import PaymentAgentsCard from './PaymentAgentsCard';

@connect(state => ({
    paymentAgent: state.paymentAgent,
    currency: state.account.get('currency'),
    country: getSettings(state).country,
}))
export default class PaymentAgentsContainer extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;
    render() {
        return <PaymentAgentsCard {...this.props} />;
    }
}
