import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class MarketPicker extends Component {

	static propTypes = {
		marketTree: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired,
		allOptionShown: PropTypes.bool.isRequired,
		showMarkets: PropTypes.array,
		value: PropTypes.string,
	};

	render() {
		const { marketTree, onChange, allOptionShown, showMarkets, value } = this.props;

		return (
			<select
				value={value}
				className="market-submarket-picker"
				onChange={e => onChange(e.target.value)}
			>
				{allOptionShown ?
					<FormattedMessage id="All" defaultMessage="All">
						{message => <option value="all">{message}</option>}
					</FormattedMessage>
				: null}
				{Object.keys(marketTree)
					.filter((marketObj, marketKey) => !showMarkets || showMarkets.includes(marketKey))
					.map((market, k) => (
					<optgroup key={k} label={marketTree[market].display_name}>
						{Object.keys(marketTree[market].submarkets).map(submarket =>
							<option key={submarket} value={submarket}>
								{marketTree[market].submarkets[submarket].display_name}
							</option>
						)}
					</optgroup>
				))}
			</select>
		);
	}
}
