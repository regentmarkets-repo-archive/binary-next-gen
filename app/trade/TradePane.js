import React from 'react';
import { DesktopToolbar } from '../navigation';
import TradeForm from './TradeForm';
import TradeConfirmation from './TradeConfirmation';

export default () => (
	<div>
		<DesktopToolbar />
		<TradeForm />
		<TradeConfirmation />
	</div>
);
