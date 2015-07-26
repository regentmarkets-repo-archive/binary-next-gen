import React from 'react';
import PortfolioTable from './PortfolioTable';

export default class PortfolioPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<h3>Account balance : USD 9,822.07</h3>
				<PortfolioTable />
			</div>
		);
	}
}
