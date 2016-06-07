import React, { PropTypes } from 'react';
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
	static propTypes = {
		actions: PropTypes.object,
	};
	shouldComponentUpdate = shouldPureComponentUpdate;
	onClose() {
		const { router } = this.context;
		const { actions } = this.props;
		actions.resetAssetPickerFilter();
		router.goBack();
	}
	render() {
		const { actions } = this.props;
		return (
			<MobilePage toolbarShown={false} backBtnBarTitle="Asset" actions={actions}>
				<AssetPickerContainer {...this.props} onClose={::this.onClose} />
			</MobilePage>
		);
	}
}
