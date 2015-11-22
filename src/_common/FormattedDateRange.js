import React from 'react';
import { FormattedDate } from 'react-intl';

export default ({fromDate, toDate}) => (
	<span>
		<FormattedDate value={fromDate} /> – <FormattedDate value={toDate} />
	</span>
);
