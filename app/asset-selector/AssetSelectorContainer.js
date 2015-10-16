import React from 'react';
import * as Actions from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AssetSelectorCard from './AssetSelectorCard';

@connect(state => ({ assets: state.assets, assetSelector: state.assetSelector, workspace: state.workspace }))
export default class AssetSelectorContainer extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object,
		assetSelector: React.PropTypes.object,
		workspace: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	shouldComponentUpdate(nextProps) {
	   	return nextProps.assets !== this.props.assets ||
			nextProps.assetSelector !== this.props.assetSelector ||
			nextProps.workspace !== this.props.workspace;
	}

	render() {
		return (
			<AssetSelectorCard actions={bindActionCreators(Actions, this.props.dispatch)} {...this.props} />
		);
	}
}
