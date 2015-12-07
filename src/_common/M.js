import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ m, values }) => (
	<FormattedMessage id={m.split(' ').join('_')} defaultMessage={m} values={values} />
);
