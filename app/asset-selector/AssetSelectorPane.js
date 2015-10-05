import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AssetActions from '../_actions/AssetActions';
import AssetList from './AssetList';
import AssetSearch from './AssetSearch';

@connect(state => ({ assets: state.assets }))
export default class AssetSeelctorPane extends React.Component {

	static propTypes = {
        assets: React.PropTypes.object,
		dispatch: React.PropTypes.func,
    };

	updateAssetData(data) {
		const actions = bindActionCreators(AssetActions, this.props.dispatch);
		const parsed = data.map(a => ({
			id: a.symbol,
			name: a.display_name,
		}));
		actions.updateAssets(parsed);
	}

	render() {
		const { dispatch } = this.props;
		const { shownAssets } = this.props.assets.toJS(); // tree, active, shownAssets, query
		const actions = bindActionCreators(AssetActions, dispatch);

		return (
			<div>
				<AssetSearch actions={actions} />
  				<AssetList assets={shownAssets} />
			</div>
		);
	}
}
