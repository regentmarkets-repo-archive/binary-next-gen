import React from 'react';
import SignupCard from './SignupCard';
import { connect } from 'react-redux';

@connect(state => ({ signup: state.signup }))
export default class SignupContainer extends React.Component {
    render() {
        return (
            <SignupCard {...this.props} />
        );
    }
}
