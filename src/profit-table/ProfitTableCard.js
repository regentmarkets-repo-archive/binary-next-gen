import React, { PropTypes } from 'react';
import ProfitTable from './ProfitTable';

const ProfitTableCard = (props) => {
	const { compact, profitTable } = props;
	return (
		<ProfitTable
			compact={compact}
			transactions={profitTable}
		/>
	);
};

ProfitTableCard.propTypes = {
	compact: PropTypes.bool,
	profitTable: PropTypes.object,
	dispatch: PropTypes.func,
	contractShown: PropTypes.object,
	areDetailsShown: PropTypes.bool,
};

export default ProfitTableCard;
