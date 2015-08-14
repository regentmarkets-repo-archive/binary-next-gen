import React from 'react';
import RiseFallFilter from './RiseFallFilter';
import RiseFallTable from './RiseFallTable';

export default class RiseFallTablePage extends React.Component {

	constructor(props) {
		super(props);
	}

	refilter() {

	}

	render() {
		return (
			<div>
				<RiseFallFilter onCalculate={::this.refilter} />
				<RiseFallTable />
			</div>
		);
	}
}
