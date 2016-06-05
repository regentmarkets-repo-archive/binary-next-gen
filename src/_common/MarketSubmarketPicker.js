import React, { PropTypes, Component } from 'react';
import Option from '../_common/Option';

export default class MarketSubmarketPicker extends Component {

	static propTypes = {
		marketTree: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired,
		allOptionShown: PropTypes.bool.isRequired,
		showMarkets: PropTypes.array,
		value: PropTypes.string,
	};

	render() {
		const { marketTree, onChange, allOptionShown, showMarkets, value } = this.props;
		const markets = Object.keys(marketTree)
			.filter(market => !(showMarkets && showMarkets.includes(marketTree[market].display_name)));

		const submarkets = markets.map(market => {
			const marketSubTree = marketTree[market];
			const marketOpt = { value: market, name: marketSubTree.display_name };

			// unicode is used as &nbsp is escaped by react and css styling on select is not reliable
			const submarketOptArr = Object.keys(marketSubTree.submarkets)
				.map(submarket => (
					{
						value: submarket,
						name: '\u00a0\u00a0\u00a0\u00a0' + marketSubTree.submarkets[submarket].display_name,
					}
				));
			submarketOptArr.unshift(marketOpt);
			return submarketOptArr;
		});

		const flattenSubmarkets = [].concat.apply([], submarkets);

		return (
			<select
				defaultValue={value}
				className="market-submarket-picker"
				onChange={e => onChange(e.target.value)}
			>
				{allOptionShown && <Option text="All" value="all" />}
				{allOptionShown && <Option text="Favorites" value="favorites" />}
				{allOptionShown && <Option text="Open For Trading" value="open" />}
				{flattenSubmarkets.map((opt, k) =>
					<option key={k} value={opt.value}>{opt.name}</option>
				)}
			</select>
		);
	}
}
