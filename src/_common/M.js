import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ m, values }) => (
	<FormattedMessage
		id={m.replace(' ', '_')}
		defaultMessage={m}
		values={values}
	/>
);
