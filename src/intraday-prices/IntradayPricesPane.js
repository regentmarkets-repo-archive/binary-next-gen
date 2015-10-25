import React from 'react';
import IntradayPricesFilter from './IntradayPricesFilter';
import IntradayPricesTable from './IntradayPricesTable';

export default class IntradayPricesPane extends React.Component {

	render() {
		return (
			<div>
				<IntradayPricesFilter />
				<IntradayPricesTable />
			</div>
		);
	}
}
