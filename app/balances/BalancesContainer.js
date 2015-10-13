import React from 'react';
import { connect } from 'react-redux';
import BalancesCard from './BalancesCard';

@connect(state => ({ account: state.account }))
export default class BalancesContainer extends React.Component {

	static propTypes = {
		account: React.PropTypes.object,
	};

	render() {
		return (
			<BalancesCard {...this.props} />
		);
	}
}
