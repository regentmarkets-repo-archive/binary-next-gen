import React from 'react';
import MobilePage from '../containers/MobilePage';
import PurchaseConfirmation from '../_common/PurchaseConfirmation';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Purchase Confirmation">
		<PurchaseConfirmation {...props} />
	</MobilePage>
);
