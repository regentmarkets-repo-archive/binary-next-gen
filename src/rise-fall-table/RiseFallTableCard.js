import React from 'react';
import RiseFallFilter from './RiseFallFilter';
import RiseFallTable from './RiseFallTable';

export default ({ refilter }) => (
	<div>
		<RiseFallFilter onCalculate={refilter} />
		<RiseFallTable />
	</div>
);
