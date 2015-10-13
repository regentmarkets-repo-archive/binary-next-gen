import React from 'react';
import { Panel } from '../common';
import AssetSelectorContainer from './AssetSelectorContainer';

export default (props) => (
	<Panel title="Assets" position={props.position}>
		<AssetSelectorContainer {...props} params={{ market: 'forex' }} />
	</Panel>
);
