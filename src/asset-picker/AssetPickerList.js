import React, { PropTypes, PureComponent } from 'react';
import AssetsPerSubmarket from './AssetsPerSubmarket';

export default class AssetPickerList extends PureComponent {

	static propTypes = {
		assets: PropTypes.object.isRequired,
		onClose: PropTypes.func,
		selectedAsset: PropTypes.string,
	};

	render() {
		const { assets } = this.props;
		console.log(assets);
		return (
			<div className="asset-list scrollable">
				{Object.keys(assets)
					.map(submarket =>
						<AssetsPerSubmarket
							{...this.props}
							key={submarket}
							assetsInSubmarket={assets[submarket]}
							ref={submarket}
						/>
					)
				}
			</div>
		);
	}
}
