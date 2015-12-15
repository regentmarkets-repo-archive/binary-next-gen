import React from 'react';
import SignupCard from './SignupCard';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

@connect(state => ({ signup: state.signup }))
export default class SignupContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <SignupCard {...this.props} />
        );
    }
}
