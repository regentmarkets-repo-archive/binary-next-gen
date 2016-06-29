import React, { PropTypes, Component } from 'react';
import StatementFilter from './StatementFilter';
import StatementTable from './StatementTable';

export default class StatementCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		currency: PropTypes.string.isRequired,
		compact: PropTypes.bool,
		transactionsFilter: PropTypes.number.isRequired,
		transactions: PropTypes.array.isRequired,
		transactionsTotal: PropTypes.number.isRequired,
	};

	render() {
		return (
			<div className="statement-card">
				<StatementFilter {...this.props} />
				<div className="statement-list">
					<StatementTable {...this.props} />
				</div>
			</div>
		);
	}
}
