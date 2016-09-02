import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { actions } from '../_store';
import contractDetailsSelectors from './ContractDetailsSelectors';
import ContractDetailsCard from './ContractDetailsCard';

@connect(contractDetailsSelectors)
export default class ContractDetailsContainer extends PureComponent {

	static defaultProps = {
		chartData: {},
	};

	static propTypes = {
		contract: PropTypes.object.isRequired,
		chartData: PropTypes.shape({
			ticks: PropTypes.array,
			candles: PropTypes.array,
		}),
	};

	componentWillMount() {
		const { chartData, contract } = this.props;

		if (!chartData.ticks) {
			actions
				.getDataForContract(contract.get('contract_id'), 1, 'all', 'ticks')
				.catch(e => {
					if (e.name === 'ContractEndsBeforeStart') {
						// do nothing
					} else {
						throw e;
					}
				});
		}
	}

	render() {
		return (
			<ContractDetailsCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
