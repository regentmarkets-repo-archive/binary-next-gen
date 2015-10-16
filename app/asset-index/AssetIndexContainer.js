import React from 'react';
import { connect } from 'react-redux';
import AssetIndexCard from './AssetIndexCard';

@connect(state => ({ assets: state.assets, assetIndexWorkspace: state.workspace.get('assetIndex') }))
export default class AsssetIndexContainer extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		assetIndexWorkspace: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<AssetIndexCard {...this.props} />
		);
	}
}
