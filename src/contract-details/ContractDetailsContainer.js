import React from 'react';
import * as Actions from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContractDetailsCard from './ContractDetailsCard';

@connect(state => ({ portfolio: state.portfolio }))
export default class ContractDetailsContainer extends React.Component {

	static propTypes = {
		portfolio: React.PropTypes.object,
		dispatch: React.PropTypes.func,
		params: React.PropTypes.object,
	};

	render() {
		const { dispatch, params, portfolio } = this.props;
		const contract = portfolio.get('contracts').find(x => x.contract_id === params.id);

		if (!contract) return null;

		return (
			<ContractDetailsCard
				actions={bindActionCreators(Actions, dispatch)}
				contract={contract}
				{...this.props} />
		);
	}
}
