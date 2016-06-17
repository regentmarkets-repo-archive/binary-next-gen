import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MobilePage from '../containers/MobilePage';
import AssetPickerContainer from './AssetPickerContainer';
import { assetPickerMobileSelector } from './AssetPickerSelectors';

@connect(assetPickerMobileSelector)
export default class AssetPickerMobile extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static contextTypes = {
		router: React.PropTypes.object,
		actions: PropTypes.object,
	};

	static propTypes = {
		actions: PropTypes.object,
	};

	componentWillMount() {
		const { actions } = this.props;
		actions.resetAssetPickerFilter();
	}

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
