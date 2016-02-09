import React from 'react';
import MobilePage from '../mobile/MobilePage';
import StatementContainer from './StatementContainer';

export default (props) => (
	<MobilePage>
		<StatementContainer compact {...props} />
	</MobilePage>
);
