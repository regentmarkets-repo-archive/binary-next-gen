import React from 'react';
import MobilePage from '../containers/MobilePage';
import StatementContainer from './StatementContainer';

export default (props) => (
	<MobilePage>
		<StatementContainer compact {...props} />
	</MobilePage>
);
