import React from 'react';
import { Panel } from '../common';
import AssetDetailsContainer from './AssetDetailsContainer';

export default (props) => (
	<Panel title={props.asset && props.asset.display_name} position={props.position}>
		<AssetDetailsContainer {...props} />
	</Panel>
);
