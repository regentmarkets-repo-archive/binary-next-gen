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
		const sorted = Object.keys(assets)		// prioritize Volatile assets
			.sort(a => {
				if (a === 'random_daily') {
					return -1;
				}

				if (a === 'random_index') {
					return -2;
				}

				return 1;
			});
		return (
			<div className="asset-list scrollable">
				{sorted
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
