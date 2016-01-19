import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import AssetPickerCard from './AssetPickerCard';
import { idSymbolMapSelector } from '../_selectors/AssetPickerSelector';

@connect(state => ({
	assets: state.assets,
	AssetPicker: state.AssetPicker,
	workspace: state.workspace,
	watchlist: state.watchlist,
	idSymbolMap: idSymbolMapSelector(state),
}))
export default class AssetPickerContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object,
		assets: PropTypes.object,
		AssetPicker: PropTypes.object,
		dispatch: PropTypes.func,
		idSymbolMap: PropTypes.object,
		workspace: PropTypes.object,
		watchlist: PropTypes.object,
	};

	render() {
		return (
			<AssetPickerCard {...this.props} />
		);
	}
}
