import React from 'react';
import { connect } from 'react-redux';
import BalancesPane from './BalancesPane';

@connect(state => ({ account: state.account }))
export default class BalancesContainer extends React.Component {

	static propTypes = {
		account: React.PropTypes.object,
	};

	render() {
		return (
			<BalancesPane {...this.props} />
		);
	}
}
