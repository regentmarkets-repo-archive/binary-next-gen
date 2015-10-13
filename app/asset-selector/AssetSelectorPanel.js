import React from 'react';
import { Panel } from '../common';
import AssetSelectorContainer from './AssetSelectorContainer';

export default (props) => (
	<Panel title="Open Positions" position={props.position}>
		<AssetSelectorContainer {...props} params={{ market: 'forex' }} />
	</Panel>
);
