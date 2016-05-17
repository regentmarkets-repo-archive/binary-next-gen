import React, { PropTypes, Component } from 'react';
import { BinaryChart } from 'binary-charts';
import ContractDetailsReceipt from './ContractDetailsReceipt';

export default class ContractDetailsCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartType: 'ticks',
		};
	}
	
	static propTypes = {
		contract: PropTypes.object.isRequired,
		actions: PropTypes.object,
		pipSize: PropTypes.number,
		chartData: PropTypes.shape({
			ticks: PropTypes.array,
			candles: PropTypes.array,
		}),
	};

	render() {
		const { contract, chartData, actions, pipSize } = this.props;
		const { ticks } = chartData;
		return (
			<div className="contract-details">
				<BinaryChart
					contract={contract}
					ticks={ticks}
                    className="trade-chart"
					rangeChange={(count, type) =>
						actions.getDataForContract(contract.contract_id, count, type)
					}
					pipSize={pipSize}
				/>
				<ContractDetailsReceipt contract={contract} />
			</div>
		);
	}
}
