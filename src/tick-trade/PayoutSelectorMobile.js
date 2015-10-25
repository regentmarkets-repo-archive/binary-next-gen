import React from 'react';
import { MobilePage } from '../_common';
import PayoutSelectorContainer from './PayoutSelectorContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Select Payout">
		<PayoutSelectorContainer {...props} />
	</MobilePage>
);
