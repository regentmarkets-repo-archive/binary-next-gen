import React, { PropTypes, Component } from 'react';
import { BinaryChart } from 'binary-charts';
import ContractReceipt from './ContractReceipt';

const chartToDataType = {
	area: 'ticks',
	candlestick: 'candles',
};

export default class ContractDetailsCard extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		actions: PropTypes.object,
		pipSize: PropTypes.number,
		theme: PropTypes.string,
		chartData: PropTypes.shape({
			ticks: PropTypes.array,
			candles: PropTypes.array,
		}),
	};

	constructor(props) {
		super(props);
		this.state = {
			chartType: 'area',
			dataType: 'ticks',
		};
	}

	changeChartType(type) {
		const { actions, contract } = this.props;
		const { chartType } = this.state;

		if (chartType === type) {
			return;
		}

		const newDataType = chartToDataType[type];
		const toStream = !contract.sell_time;
		actions.getDataForContract(contract.contract_id, 1, 'all', newDataType, toStream);
		this.setState({ chartType: type, dataType: newDataType });
	}

	render() {
		const { contract, chartData, actions, pipSize, theme } = this.props;
		const { chartType, dataType } = this.state;
		const { ticks, candles } = chartData;

		const data = dataType === 'candles' ? candles : ticks;
		const allowCandle = !contract.tick_count;

		const rangeChange = (count, durationType) =>
			actions.getDataForContract(contract.contract_id, count, durationType, dataType);

		return (
			<div className="contract-details-card">
				<h5>{contract.longcode}</h5>
				<div className="contract-details">
					<BinaryChart
						className="contract-chart"
						defaultRange={6}
						contract={contract}
						ticks={data}
						type={chartType}
						theme={theme}
						rangeChange={contract ? undefined : rangeChange}
						typeChange={allowCandle && ::this.changeChartType}
						pipSize={pipSize}
					/>
					<ContractReceipt actions={actions} contract={contract} />
				</div>
			</div>
		);
	}
}
