import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MobilePage from '../containers/MobilePage';
import AssetPickerContainer from './AssetPickerContainer';
import { assetPickerMobileSelector } from './AssetPickerSelectors';

@connect(assetPickerMobileSelector)
export default class AssetPickerMobile extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const { router } = this.context;
		return (
			<MobilePage toolbarShown={false} backBtnBarTitle="Asset">
				<AssetPickerContainer {...this.props} onClose={() => router.goBack()} />
			</MobilePage>
		);
	}
}
