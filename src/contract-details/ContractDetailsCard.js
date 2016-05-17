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

	changeDataType(type) {
		const { actions, contract } = this.props;
		const { chartType } = this.state;

		if (chartType === type) {
			return;
		}

		actions.getDataForContract(contract.contract_id, 1, 'all', type);
		this.setState({ chartType: type });
	}

	render() {
		const { contract, chartData, actions, pipSize } = this.props;
		const { chartType } = this.state;
		const { ticks, candles } = chartData;

		const type = (chartType === 'candles' && candles) ? 'candles' : 'ticks';
		const data = type === 'candles' ? candles : ticks;

		return (
			<div className="contract-details">
				<BinaryChart
					className="trade-chart"
					contract={contract}
					ticks={data}
					type={type}
					rangeChange={(count, durationType) =>
						actions.getDataForContract(contract.contract_id, count, durationType)
					}
					typeChange={::this.changeDataType}
					pipSize={pipSize}
				/>
				<ContractDetailsReceipt contract={contract} />
			</div>
		);
	}
}
