import React from 'react';
import { MobilePage } from '../_common';
import AssetPickerContainer from './AssetPickerContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Asset">
		<AssetPickerContainer {...props} />
	</MobilePage>
);
