import React from 'react';
import { MobilePage } from '../common';
import PayoutSelector from './PayoutSelector';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<PayoutSelector {...props} />
	</MobilePage>
);
