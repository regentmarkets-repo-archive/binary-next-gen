import React from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../_actions';
import { connect } from 'react-redux';
import SigninCard from './SigninCard';

@connect(state => ({ signin: state.signin }))
export default class SigninContainer extends React.Component {

	static propTypes = {
		dispatch: React.PropTypes.func,
		signin: React.PropTypes.object,
	};

	render() {
		return (
			<SigninCard
				actions={bindActionCreators(Actions, this.props.dispatch)}
				{...this.props} />
		);
	}
}
