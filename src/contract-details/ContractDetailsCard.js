import React, { PropTypes, PureComponent } from 'react';
import ContractReceipt from './ContractReceipt';
import ContractChart from './ContractChart';
import ContractDetailsMobileLayout from './mobile/ContractDetailsMobileLayout';
import SellAtMarketButton from './SellAtMarketButton';
import ContractValidationError from './ContractValidationError';
import ContractWinLose from './ContractWinLose';

export default class ContractDetailsCard extends PureComponent {
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

		if (!contract) return null;

		return (
			<div className="contract-details-card">
				<h5>{contract.longcode}</h5>
				{compact ?
					<ContractDetailsMobileLayout
						contract={contract}
						chartComponent={
							<div>
								<ContractChart
									contract={contract}
									chartData={chartData}
									pipSize={pipSize}
								/>
								<ContractWinLose contract={contract} />
								<SellAtMarketButton contract={contract} />
								<ContractValidationError contract={contract} />
							</div>
						}
						detailsComponent={<ContractReceipt contract={contract} />}
					/> :
					<div className="contract-details">
						<ContractChart
							contract={contract}
							chartData={chartData}
							pipSize={pipSize}
						/>
						<ContractReceipt contract={contract} />
					</div>
				}
			</div>
		);
	}
}
