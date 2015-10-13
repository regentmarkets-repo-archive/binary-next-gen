import React from 'react';
import { Panel } from '../common';
import ProfitTableContainer from './ProfitTableContainer';

export default (props) => (
	<Panel title="Profit Table" position={props.position}>
		<ProfitTableContainer {...props} />
	</Panel>
);
