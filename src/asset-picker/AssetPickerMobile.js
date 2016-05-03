import React from 'react';
import { connect } from 'react-redux';
import MobilePage from '../containers/MobilePage';
import AssetPickerContainer from './AssetPickerContainer';
import { assetPickerMobileSelector } from './AssetPickerSelectors';

@connect(assetPickerMobileSelector)
export default class AssetPickerMobile extends React.Component {
	render() {
		return (
			<MobilePage toolbarShown={false} backBtnBarTitle="Asset">
				<AssetPickerContainer {...this.props} />
			</MobilePage>
		);
	}
}
