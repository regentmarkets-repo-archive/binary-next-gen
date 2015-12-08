import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SigninCard from './SigninCard';

@connect(state => ({ signin: state.signin }))
export default class SigninContainer extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func,
		signin: PropTypes.object,
	};

	render() {
		return (
			<SigninCard {...this.props} />
		);
	}
}
