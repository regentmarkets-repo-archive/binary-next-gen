import React from 'react';
import SignupCard from './SignupCard';

export default class SignupContainer extends React.Component {
    render() {
        return (
            <SignupCard {...this.props} />
        );
    }
}
