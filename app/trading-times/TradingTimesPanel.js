import React from 'react';
import { Panel } from '../common';
import TradingTimesContainer from './TradingTimesContainer';

export default (props) => (
	<Panel title="Trading Times" position={props.position}>
		<TradingTimesContainer {...props} />
	</Panel>
);
