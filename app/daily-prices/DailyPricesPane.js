import React from 'react';
import { DesktopToolbar } from '../navigation';
import DailyPricesFilter from './DailyPricesFilter';
import DailyPricesTable from './DailyPricesTable';

export default () => (
	<div>
		<DesktopToolbar />
		<DailyPricesFilter />
		<DailyPricesTable />
	</div>
);
