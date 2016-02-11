import React from 'react';
import MobilePage from '../containers/MobilePage';
import AssetPickerContainer from './AssetPickerContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Asset">
		<AssetPickerContainer {...props} />
	</MobilePage>
);
