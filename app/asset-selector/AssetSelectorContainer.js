import React from 'react';
import { connect } from 'react-redux';
import AssetSelectorPane from './AssetSelectorPane';

@connect(state => ({ assets: state.assets }))
export default class AssetSelectorContainer extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<AssetSelectorPane {...this.props} />
		);
	}
}
