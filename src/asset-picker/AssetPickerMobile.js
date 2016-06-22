import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MobilePage from '../containers/MobilePage';
import AssetPickerContainer from './AssetPickerContainer';
import { assetPickerMobileSelector } from './AssetPickerSelectors';

@connect(assetPickerMobileSelector)
export default class AssetPickerMobile extends Component {

	static contextTypes = {
		router: PropTypes.object,
		actions: PropTypes.object,
	};

	static propTypes = {
		actions: PropTypes.object,
	};

	componentWillMount() {
		const { actions } = this.props;
		actions.resetAssetPickerFilter();
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	onClose = () => {
		const { router } = this.context;
		router.goBack();
	}

	render() {
		return (
			<MobilePage toolbarShown={false} backBtnBarTitle="Asset">
				<AssetPickerContainer {...this.props} onClose={this.onClose} />
			</MobilePage>
		);
	}
}
