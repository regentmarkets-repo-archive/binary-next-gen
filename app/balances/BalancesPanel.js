import React from 'react';
import { Panel } from '../_common';
import BalancesContainer from './BalancesContainer';

export default (props) => (
	<Panel title="Balances" position={props.position}>
		<BalancesContainer {...props} />
	</Panel>
);
