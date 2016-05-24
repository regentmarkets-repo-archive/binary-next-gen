import React, { PropTypes, Component } from 'react';
import { BinaryChart } from 'binary-charts';
import ContractReceipt from './ContractReceipt';

const chartToDataType = {
	area: 'ticks',
	candlestick: 'candles',
};

export default class ContractDetailsCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartType: 'area',
			dataType: 'ticks',
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

	changeChartType(type) {
		const { actions, contract } = this.props;
		const { chartType } = this.state;

		if (chartType === type) {
			return;
		}

		const newDataType = chartToDataType[type];
		actions.getDataForContract(contract.contract_id, 1, 'all', newDataType);
		this.setState({ chartType: type, dataType: newDataType });
	}

	render() {
		const { contract, chartData, actions, pipSize } = this.props;
		const { chartType, dataType } = this.state;
		const { ticks, candles } = chartData;

		const data = dataType === 'candles' ? candles : ticks;
		const allowCandle = !contract.tick_count && contract.sell_time;

		return (
			<div>
				<h5>{contract.longcode}</h5>
				<div className="contract-details">
					<BinaryChart
						className="trade-chart"
						defaultRange={6}
						contract={contract}
						ticks={data}
						type={chartType}
						rangeChange={(count, durationType) =>
							actions.getDataForContract(contract.contract_id, count, durationType, dataType)
						}
						typeChange={allowCandle && ::this.changeChartType}
						pipSize={pipSize}
					/>
					<ContractReceipt actions={actions} contract={contract} />
				</div>
			</div>
		);
	}
}
