import React from 'react';
import { Panel } from '../common';
import TickTradeCard from './TickTradeCard';

export default (props) => (
	<Panel title="Tick Trade" position={props.position}>
		<TickTradeCard {...props} />
	</Panel>
);
