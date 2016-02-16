import React, { PropTypes } from 'react';
import AssetDetailsTable from './AssetDetailsTable';

export default class AssetDetailsCard extends React.Component {

	static propTypes = {
		activeAsset: PropTypes.object,
	};

	render() {
		const { activeAsset } = this.props;

		return activeAsset ? <AssetDetailsTable asset={activeAsset} /> : <div />;
	}
}
