import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ m = '', values }) => (
	<FormattedMessage
		id={m}
		defaultMessage={m}
		values={values}
	/>
);
