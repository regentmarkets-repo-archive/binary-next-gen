import React, { Component } from 'react';
import ContractReceipt from './ContractReceipt';
import ContractChart from './ContractChart';
import ContractDetailsMobileLayout from './mobile/ContractDetailsMobileLayout';

export default class ContractDetailsCard extends Component {

	constructor(props) {
		super(props);
		this.state = { key: 'open' };
	}
	props: {
		compact: boolean,
		contract: Contract,
		pipSize: number,
	};

	setSoldLater() {
		setTimeout(
			() => this.ismounted && this.setState(() => ({ key: 'sold' })),
			3000
		);
	}

	componentDidMount() {
		this.ismounted = true;
	}

	componentWillUnmount() {
		this.ismounted = false;
	}

	render() {
		const { compact, contract, pipSize } = this.props;
		if (!contract) return null;

		const sold = !!contract.sell_price;
		sold && this.setSoldLater();

		return (
			<div key={this.state.key} className="contract-details-card">
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
