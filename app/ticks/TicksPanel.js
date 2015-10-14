import React from 'react';
import { Panel } from '../common';
import TicksCard from './TicksCard';

export default (props) => (
	<Panel title="Market Details" position={props.position}>
		<TicksCard {...props} />
	</Panel>
);
