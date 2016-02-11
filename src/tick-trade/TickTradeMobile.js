import React from 'react';
import MobilePage from '../containers/MobilePage';
import TickTradeContainer from './TickTradeContainer';

export default (props) => (
	<MobilePage>
		<TickTradeContainer compact {...props} />
	</MobilePage>
);
