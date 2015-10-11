import React from 'react';
import { connect } from 'react-redux';
import Modal from '../common/Modal';
import StatementTable from './StatementTable';
import TransactionDetails from './TransactionDetails';

@connect(state => ({ statement: state.statement, account: state.account }))
export default class StatenentPane extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
		statement: React.PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			detailsShown: false,
			transactionDetails: {},
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
		const { currency } = this.props.account.toJS();
		const { detailsShown, transactionDetails } = this.state;

		return (
			<div>
				<Modal shown={detailsShown} onClose={::this.onCloseDetails}>
					<TransactionDetails transaction={transactionDetails} />
				</Modal>
				<StatementTable transactions={transactions} onViewDetails={::this.showDetails} currency={currency} />
			</div>
		);
	}
}
