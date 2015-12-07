import React from 'react';
import { connect } from 'react-redux';
import AssetIndexCard from './AssetIndexCard';

@connect(state => ({ assets: state.assets, assetIndexFilter: state.workspace.get('assetIndex') }))
export default class AsssetIndexContainer extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		dispatch: React.PropTypes.func.isRequired,
		assetIndexFilter: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.assets !== this.props.assets ||
			nextProps.assetIndexFilter !== this.props.assetIndexFilter;
	}

	render() {
		return (
			<AssetIndexCard {...this.props} />
		);
	}
}
