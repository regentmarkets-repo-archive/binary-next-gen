import React from 'react';
import { MobilePage } from '../_common';
import StatementContainer from './StatementContainer';

export default (props) => (
	<MobilePage>
		<StatementContainer compact {...props} />
	</MobilePage>
);
