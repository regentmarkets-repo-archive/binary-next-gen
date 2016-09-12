import React, { PureComponent } from 'react';
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

	props: {
		contract: Contract,
		chartData: {
			ticks: Tick[],
			candles: Candle[],
		},
	};

	componentWillMount() {
		const { chartData, contract } = this.props;

		if (!chartData.ticks) {
			actions
				.getDataForContract(contract.get('contract_id'), 'ticks')
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
