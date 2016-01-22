import React from 'react';
import { MobilePage, PurchaseConfirmation } from '../_common';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Purchase Confirmation">
		<PurchaseConfirmation {...props} />
	</MobilePage>
);
