import React from 'react';
import { Panel } from '../_common';
import AssetPickerContainer from './AssetPickerContainer';

export default (props) => (
	<Panel title="Assets" position={props.position}>
		<AssetPickerContainer {...props} params={{ market: 'forex' }} />
	</Panel>
);
