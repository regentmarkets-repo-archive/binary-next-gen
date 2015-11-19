import React from 'react';
import { MobilePage } from '../_common';
import TickTradeContainer from './TickTradeContainer';

export default (props) => (
	<MobilePage>
		<TickTradeContainer compact {...props} />
	</MobilePage>
);
