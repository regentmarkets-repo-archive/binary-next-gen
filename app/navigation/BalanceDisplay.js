import React from 'react';

export default ({currency, amount}) => (
	<span>Account balance: {`${currency} ${(+amount).toFixed(2)}`}</span>
);
