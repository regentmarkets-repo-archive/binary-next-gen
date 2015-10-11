import React from 'react';
import { bindActionCreators } from 'redux';
import * as PortfolioActions from '../_actions/PortfolioActions';
import { Modal } from '../common';
import ProfitTable from './ProfitTable';
import ContractDetails from './ContractDetails';

const profits = [{
    date: new Date().getTime() / 1000,
    ref: '10608952088',
    details: 'USD 10.00 payout if Random Moon after 10 ticks is strictly higher than entry spot.',
    purchasePrice: 5.07,
    saleDate: new Date().getTime() / 1000,
    salePrice: 10.00,
    profitLoss: 4.93,
}, {
    date: new Date().getTime() / 1000,
    ref: '10608948788',
    details: 'USD 10.00 payout if the last digit of Random Moon is 0 after 10 ticks.',
    purchasePrice: 1.02,
    saleDate: new Date().getTime() / 1000,
    salePrice: 0.00,
    profitLoss: -1.02,
}];

const ProfitTablePane = (props) => {
	const showDetails = contract => {
		const actions = bindActionCreators(PortfolioActions, props.dispatch);
		actions.detailsForContract(true, contract);
	};

	const onCloseDetails = () => {
		const actions = bindActionCreators(PortfolioActions, props.dispatch);
		actions.detailsForContract(false);
	};

	const { contractShown, areDetailsShown } = {};
	return (
		<div>
			<Modal shown={areDetailsShown} onClose={onCloseDetails}>
				<ContractDetails contract={contractShown} />
			</Modal>
			<ProfitTable
				profits={profits}
				onViewDetails={showDetails} />
		</div>
	);
};

ProfitTablePane.propTypes = {
	profitTable: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default ProfitTablePane;
