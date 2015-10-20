import React from 'react';
import { MobilePage } from '../common';
import PayoutSelectorContainer from './PayoutSelectorContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Select Payout">
		<PayoutSelectorContainer {...props} />
	</MobilePage>
);
