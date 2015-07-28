import React from 'react';
import { LiveData } from 'binary-live-api';
import PortfolioTable from './PortfolioTable';
import PortfolioDetails from './PortfolioDetails';

export default class PortfolioPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('1C8FsTiUegCGq2ZqM8ntMdHsUUQNE9grp5p9gD6VmSmyocfcJiS0n2uOM83kakaYZMRfFCbZGI6kzfu0lYkHHoYFpMJRKKVaVHe0Ezs1KqL6JZvMwNqAUFxLfulKoalD')

		this.state = { contracts: [] };

		liveData.api.getPortfolio();

		liveData.onDataChange = (function(data) {
			this.setState({
				contracts: liveData.contracts
			});
		}).bind(this);
	}

	render() {

		return (
			<div>
				<h3>Account balance : USD 9,822.07</h3>
				<PortfolioTable contracts={this.state.contracts} />
				<PortfolioDetails />
			</div>
		);
	}
}
