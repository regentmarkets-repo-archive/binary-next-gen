import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import AssetPickerItem from './AssetPickerItem';
import AssetPickerHeader from './AssetPickerHeader';

export default class AssetPickerList extends Component {

	static propTypes = {
		assets: PropTypes.array.isRequired,
		compact: PropTypes.bool,
		grouped: PropTypes.bool,
		selectedAsset: PropTypes.string,
	};

	componentDidMount() {
		const focusedNode = findDOMNode(this.refs.focused);
		if (focusedNode) focusedNode.focus();
    }

	render() {
		const { assets, grouped, selectedAsset } = this.props;

		let prevMarket = '';
		let prevSubmarket = '';

		return (
			<table>
				{assets.reduce((components, asset) => {
					if (grouped && prevSubmarket !== asset.submarket) {
						components.push(
							<AssetPickerHeader
								key={asset.submarket}
								market={asset.market}
								submarket={asset.submarket}
								showMarket={prevMarket !== asset.market}
							/>
						);
						prevMarket = asset.market;
						prevSubmarket = asset.submarket;

						components.push(
							<tbody key={'tbody-' + prevSubmarket}>
								{assets
									.filter(x =>
										x.submarket === prevSubmarket)
									.map(x =>
										<AssetPickerItem
											{...this.props}
											key={x.symbol}
											asset={x}
											selected={selectedAsset === x.symbol}
											ref={selectedAsset === x.symbol ? 'focused' : null}
										/>
									)
								}
							</tbody>
						);
					}

					return components;
				}, [])}
			</table>
		);
	}
}
