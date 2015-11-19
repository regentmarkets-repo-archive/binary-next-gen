import React from 'react';
import { MobilePage } from '../_common';
import ProfitTableContainer from './ProfitTableContainer';

export default (props) => (
	<MobilePage>
		<ProfitTableContainer compact {...props} />
	</MobilePage>
);
