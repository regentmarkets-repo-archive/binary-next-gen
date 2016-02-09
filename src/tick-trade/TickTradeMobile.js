import React from 'react';
import MobilePage from '../mobile/MobilePage';
import TickTradeContainer from './TickTradeContainer';

export default (props) => (
	<MobilePage>
		<TickTradeContainer compact {...props} />
	</MobilePage>
);
