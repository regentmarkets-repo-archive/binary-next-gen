import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ m }) => (
	<FormattedMessage id={m} defaultMessage={m} />
);
