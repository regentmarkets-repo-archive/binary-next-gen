import React from 'react';
import { MobilePage } from '../common';
import ProfitTableContainer from './ProfitTableContainer';

export default (props) => (
	<MobilePage>
		<ProfitTableContainer compact={true} {...props} />
	</MobilePage>
);
