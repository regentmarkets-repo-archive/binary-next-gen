import React from 'react';
import { bindActionCreators } from 'redux';
import * as WorkspaceActions from '../_actions/WorkspaceActions';
import { connect } from 'react-redux';
import AssetIndexCard from './AssetIndexCard';

@connect(state => ({ assets: state.assets, assetIndexFilter: state.workspace.get('assetIndex') }))
export default class AsssetIndexContainer extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		dispatch: React.PropTypes.func.isRequired,
		assetIndexFilter: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<AssetIndexCard
				actions={bindActionCreators(WorkspaceActions, this.props.dispatch)}
				{...this.props} />
		);
	}
}
