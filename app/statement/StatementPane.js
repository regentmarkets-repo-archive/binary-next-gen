import React from 'react';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
import StatementTable from './StatementTable';
import TransactionDetails from './TransactionDetails';

@connect(state => ({ statement: state.statement }))
export default class StatenentPane extends React.Component {

	static propTypes = {
		statement: React.PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			detailsShown: false,
			transactionDetails: {},
			totals: {},
		};
	}

	showDetails(transaction) {
		this.setState({ transactionDetails: transaction, detailsShown: true });
	}

	onCloseDetails() {
		this.setState({ detailsShown: false });
	}

	render() {
		const { transactions } = this.props.statement.toJS();
		const { detailsShown, transactionDetails } = this.state;
		const totals = {};

		return (
			<div>
				<Modal shown={detailsShown} onClose={::this.onCloseDetails}>
					<TransactionDetails transaction={transactionDetails} />
				</Modal>
				<StatementTable transactions={transactions} totals={totals} onViewDetails={::this.showDetails} />
			</div>
		);
	}
}
