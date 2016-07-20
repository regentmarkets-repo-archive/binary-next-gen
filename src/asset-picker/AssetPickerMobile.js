import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from '../_store';
import MobilePage from '../containers/MobilePage';
import AssetPickerContainer from './AssetPickerContainer';
import { assetPickerMobileSelector } from './AssetPickerSelectors';

@connect(assetPickerMobileSelector)
export default class AssetPickerMobile extends Component {

	static contextTypes = {
		router: PropTypes.object,
	};

	componentWillMount() {
		actions.resetAssetPickerFilter();
	}

	onClose = () => {
		const { router } = this.context;
		router.goBack();
	}

	render() {
		return (
			<MobilePage toolbarShown={false} backBtnBarTitle="Asset">
				<AssetPickerContainer {...this.props} compact onClose={this.onClose} />
			</MobilePage>
		);
	}
}
