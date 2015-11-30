import React from 'react';
import { MobilePage } from '../_common';
import AssetSelectorContainer from './AssetSelectorContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Asset">
		<AssetSelectorContainer {...props} />
	</MobilePage>
);
