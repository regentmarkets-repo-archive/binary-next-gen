import React, { PropTypes, Component } from 'react';
import { actions } from '../_store';
import ContractReceipt from './ContractReceipt';
import ContractChart from './ContractChart';
import ContractDetailsMobileLayout from './mobile/ContractDetailsMobileLayout';
import SellAtMarketButton from './SellAtMarketButton';
import ContractValidationError from './ContractValidationError';

export default class ContractDetailsCard extends Component {
	static propTypes = {
		compact: PropTypes.bool,
		contract: PropTypes.object.isRequired,
		pipSize: PropTypes.number,
		chartData: PropTypes.shape({
			ticks: PropTypes.array,
			candles: PropTypes.array,
		}),
	};

	sellAtMarket = () => {
		const { contract } = this.props;
		actions.sellContract(contract.contract_id, 0);
	}

	render() {
		const { compact, contract, chartData, pipSize } = this.props;
		const chartComponent = (
			<ContractChart
				contract={contract}
				chartData={chartData}
				pipSize={pipSize}
			/>
		);

		const detailsComponent = <ContractReceipt contract={contract} />;

		return (
			<div className="contract-details-card">
				<h5>{contract.longcode}</h5>
				{compact ?
					<ContractDetailsMobileLayout
						chartComponent={chartComponent}
						detailsComponent={detailsComponent}
					/> :
					<div className="contract-details">
						{chartComponent}
						{detailsComponent}
					</div>
				}
				<SellAtMarketButton
					contract={contract}
					onClick={this.sellAtMarket}
				/>
				<ContractValidationError contract={contract} />
			</div>
		);
	}
}
