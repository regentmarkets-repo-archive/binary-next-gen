import React, { PureComponent } from 'react';
import ContractReceipt from './ContractReceipt';
import ContractChart from './ContractChart';
import ContractDetailsMobileLayout from './mobile/ContractDetailsMobileLayout';

export default class ContractDetailsCard extends PureComponent {

	props: {
		compact: boolean,
		contract: Contract,
		pipSize: number,
	};

	render() {
		const { compact, contract, pipSize } = this.props;
		if (!contract) return null;

		return (
			<div className="contract-details-card">
				<h5>{contract.longcode}</h5>
				{compact ?
					<ContractDetailsMobileLayout
						contract={contract}
						chartComponent={
							<ContractChart
								contract={contract}
								pipSize={pipSize}
							/>
						}
						detailsComponent={<ContractReceipt contract={contract} />}
					/> :
					<div className="contract-details">
						<ContractChart
							contract={contract}
							pipSize={pipSize}
						/>
						<ContractReceipt contract={contract} />
					</div>
				}
			</div>
		);
	}
}
