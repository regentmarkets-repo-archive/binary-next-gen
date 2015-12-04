import React from 'react';
import { FormattedDate } from 'react-intl';

const FormattedDateRange = ({fromDate, toDate}) => (
	<span>
		<FormattedDate value={fromDate} /> – <FormattedDate value={toDate} />
	</span>
);

FormattedDate.propTypes = {
	fromDate: React.PropTypes.instanceOf(Date),
	toDate: React.PropTypes.instanceOf(Date),
};

export default FormattedDateRange;
