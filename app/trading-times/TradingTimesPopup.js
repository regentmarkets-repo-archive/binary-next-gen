import React from 'react';
import { Popup } from '../common';
import TradingTimesContainer from './TradingTimesContainer';

export default (props) => (
	<Popup>
		<TradingTimesContainer {...props} />
	</Popup>
);
