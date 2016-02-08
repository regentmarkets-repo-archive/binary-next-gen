import React, { PropTypes } from 'react';
import AssetPickerItem from './AssetPickerItem';

export default class AssetPickerList extends React.Component {

	static propTypes = {
		assets: PropTypes.array.isRequired,
		compact: PropTypes.bool,
	};

	render() {
		const { assets } = this.props;

			return (
			<table>
				<tbody>
					{assets.map(asset =>
						<AssetPickerItem
							key={asset.symbol}
							asset={asset}
							{...this.props}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
