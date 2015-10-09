import React from 'react';
import { DesktopToolbar } from '../navigation';
import RiseFallFilter from './RiseFallFilter';
import RiseFallTable from './RiseFallTable';

export default ({refilter}) => (
	<div>
		<DesktopToolbar />
		<RiseFallFilter onCalculate={refilter} />
		<RiseFallTable />
	</div>
);
