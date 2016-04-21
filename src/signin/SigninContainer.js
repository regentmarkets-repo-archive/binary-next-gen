import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import SigninCard from './SigninCard';

@connect(state => ({ signin: state.signin, token: state.account.get('token') }))
export default class SigninContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<SigninCard {...this.props} />
		);
	}
}
