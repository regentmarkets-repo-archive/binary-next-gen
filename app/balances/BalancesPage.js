import React from 'react';
import { MobilePage } from '../_common';
import BalancesContainer from './BalancesContainer';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<BalancesContainer {...props} />
	</MobilePage>
);
