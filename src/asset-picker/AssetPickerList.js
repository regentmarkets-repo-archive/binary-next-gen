import React, { PropTypes, PureComponent } from 'react';
import AssetsPerSubmarket from './AssetsPerSubmarket';

export default class AssetPickerList extends PureComponent {

	static propTypes = {
		assets: PropTypes.array.isRequired,
		onClose: PropTypes.func,
		selectedAsset: PropTypes.string,
	};

	render() {
		const { assets } = this.props;
		return (
			<div className="asset-list scrollable">
				{assets
					.map(grouped =>
						<AssetsPerSubmarket
							{...this.props}
							key={grouped[0].submarket}
							assetsInSubmarket={grouped}
						/>
					)
				}
			</div>
		);
	}
}
