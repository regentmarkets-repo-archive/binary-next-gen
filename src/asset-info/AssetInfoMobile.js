import React from 'react';
import MobilePage from '../containers/MobilePage';
import AssetInfoCard from './AssetInfoCard';

export default (props) => (
	<MobilePage>
		<AssetInfoCard {...props} />
	</MobilePage>
);
