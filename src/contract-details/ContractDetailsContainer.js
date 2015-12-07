import React from 'react';
import { connect } from 'react-redux';
import ContractDetailsCard from './ContractDetailsCard';

@connect(state => ({ portfolio: state.portfolio }))
export default class ContractDetailsContainer extends React.Component {

	static propTypes = {
		portfolio: React.PropTypes.object,
		params: React.PropTypes.object,
	};

	render() {
		const { params, portfolio } = this.props;
		const contract = portfolio.get('contracts').find(x => x.contract_id === params.id);

		if (!contract) return null;

		return (
			<ContractDetailsCard contract={contract} {...this.props} />
		);
	}
}
