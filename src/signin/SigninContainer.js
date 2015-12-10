import React from 'react';
import { connect } from 'react-redux';
import SigninCard from './SigninCard';

@connect(state => ({ signin: state.signin }))
export default class SigninContainer extends React.Component {

	render() {
		return (
			<SigninCard {...this.props} />
		);
	}
}
