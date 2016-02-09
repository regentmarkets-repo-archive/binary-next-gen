import React from 'react';
import MobilePage from '../mobile/MobilePage';
import PayoutPickerContainer from './PayoutPickerContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Payout">
		<PayoutPickerContainer {...props} />
	</MobilePage>
);
