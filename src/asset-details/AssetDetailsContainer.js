import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AssetDetailsCard from './AssetDetailsCard';

@connect(state => ({ assets: state.assets, workspace: state.workspace }))
export default class AssetDetailsContainer extends React.Component {

	static propTypes = {
		assets: PropTypes.object,
		dispatch: PropTypes.func,
	};

	render() {
		return (
			<AssetDetailsCard {...this.props} />
		);
	}
}
