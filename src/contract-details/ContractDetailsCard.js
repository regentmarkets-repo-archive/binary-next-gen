import React, { PropTypes, Component } from 'react';
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
						contract={contract}
						chartComponent={
							<div>
								{chartComponent}
								<SellAtMarketButton contract={contract} />
								<ContractValidationError contract={contract} />
							</div>
						}
						detailsComponent={detailsComponent}
					/> :
					<div className="contract-details">
						{chartComponent}
						{detailsComponent}
					</div>
				}
			</div>
		);
	}
}
