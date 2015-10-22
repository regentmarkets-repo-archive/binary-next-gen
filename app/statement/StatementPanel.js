import React from 'react';
import { Panel } from '../_common';
import StatementCard from './StatementCard';

export default (props) => (
	<Panel title="Statement" position={props.position}>
		<StatementCard {...props} />
	</Panel>
);
