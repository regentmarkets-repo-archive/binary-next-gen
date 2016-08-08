import React from 'react';
import MobilePage from '../containers/MobilePage';
import AssetInfoContainer from './AssetInfoContainer';

export default (props) => (
	<MobilePage>
		<AssetInfoContainer {...props} />
	</MobilePage>
);
