import React from 'react';
import { Panel } from '../_common';
import AssetIndexContainer from './AssetIndexContainer';

export default (props) => (
	<Panel title="Asset Index" position={props.position}>
		<AssetIndexContainer {...props} />
	</Panel>
);
