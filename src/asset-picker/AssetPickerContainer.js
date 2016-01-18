import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import AssetPickerCard from './AssetPickerCard';

@connect(state => ({
	assets: state.assets,
	assetPicker: state.assetPicker,
	workspace: state.workspace,
	watchlist: state.watchlist,
}))
export default class AssetPickerContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: PropTypes.object,
		assetPicker: PropTypes.object,
		workspace: PropTypes.object,
		watchlist: PropTypes.object,
		dispatch: PropTypes.func,
		actions: PropTypes.object,
	};

	render() {
		return (
			<AssetPickerCard {...this.props} />
		);
	}
}
