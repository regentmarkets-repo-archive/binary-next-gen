import React from 'react';
import PortfolioTable from './PortfolioTable';
import PortfolioDetails from './PortfolioDetails';

export default class PortfolioPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<h3>Account balance : USD 9,822.07</h3>
				<PortfolioTable />
				<PortfolioDetails />
			</div>
		);
	}
}
