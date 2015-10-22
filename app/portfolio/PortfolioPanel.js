import React from 'react';
import { Panel } from '../_common';
import PortfolioContainer from './PortfolioContainer';

export default (props) => (
	<Panel title="Open Positions" position={props.position}>
		<PortfolioContainer {...props} />
	</Panel>
);
