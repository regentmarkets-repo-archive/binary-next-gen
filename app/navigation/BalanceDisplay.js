import React from 'react';

const BalanceDisplay = (props) => {
	const balance = props.account.toJS().balance;
	const balanceStr = balance && balance.amount && `${balance.currency} ${balance.amount.toFixed(2)}`;

	return (
		<h5>Account balance: {balanceStr} </h5>
	);
};

BalanceDisplay.propTypes = {
	account: React.PropTypes.object.isRequired,
};

export default BalanceDisplay;
