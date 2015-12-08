import React, { PropTypes } from 'react';
import { FormattedDate } from 'react-intl';

const FormattedDateRange = ({ fromDate, toDate }) => (
	<span>
		<FormattedDate value={fromDate} /> – <FormattedDate value={toDate} />
	</span>
);

FormattedDate.propTypes = {
	fromDate: PropTypes.instanceOf(Date),
	toDate: PropTypes.instanceOf(Date),
};

export default FormattedDateRange;
