import React from 'react';
import CreateAccountCard from './CreateAccountCard';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

@connect(state => ({ createAccount: state.createAccount }))
export default class CreateAccountContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <CreateAccountCard {...this.props} />
        );
    }
}
