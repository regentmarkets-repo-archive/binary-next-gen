import React from 'react';
import RiseFallFilter from './RiseFallFilter';
import RiseFallTable from './RiseFallTable';

export default class RiseFallTablePage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				<RiseFallFilter />
				<RiseFallTable />
			</div>
		);
	}
}
