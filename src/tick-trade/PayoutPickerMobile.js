import React from 'react';
import { MobilePage } from '../_common';
import PayoutPickerContainer from './PayoutPickerContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Payout">
		<PayoutPickerContainer {...props} />
	</MobilePage>
);
