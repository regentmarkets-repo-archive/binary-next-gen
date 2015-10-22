import React from 'react';
import { DesktopPage } from '../_common';
import DailyPricesCard from './DailyPricesCard';

export default (props) => (
	<DesktopPage>
		<DailyPricesCard {...props} />
	</DesktopPage>
);
