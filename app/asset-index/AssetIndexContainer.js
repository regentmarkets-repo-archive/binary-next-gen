import React from 'react';
import { connect } from 'react-redux';
import AssetIndexPane from './AssetIndexPane';

@connect(state => ({ assets: state.assets }))
export default class AsssetIndexContainer extends React.Component {

	static propTypes = {
		params: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<AssetIndexPane {...this.props} />
		);
	}
}
