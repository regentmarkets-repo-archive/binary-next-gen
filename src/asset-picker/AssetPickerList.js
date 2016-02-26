import React, { PropTypes, Component } from 'react';
import AssetPickerItem from './AssetPickerItem';
import AssetPickerHeader from './AssetPickerHeader';

export default class AssetPickerList extends Component {

	static propTypes = {
		assets: PropTypes.array.isRequired,
		compact: PropTypes.bool,
		grouped: PropTypes.bool,
	};

	componentDidMount() {
		// React.findDOMNode(this.refs.activeRow).focus();
    }

	render() {
		const { assets, grouped } = this.props;

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
											key={x.symbol}
											asset={x}
											{...this.props}
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
