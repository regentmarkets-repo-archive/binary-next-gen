import React from 'react';
import { MobilePage } from '../_common';
import PurchaseConfirmation from './PurchaseConfirmation';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Purchase Confirmation">
		<PurchaseConfirmation {...props} />
	</MobilePage>
);
