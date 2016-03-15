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
				{marketTree
					.filter((marketObj, marketKey) => !showMarkets || ~showMarkets.indexOf(marketKey))
					.map((market, k) => (
					<optgroup key={k} label={market.get('display_name')}>
						{market.get('submarkets').map((submarket, submarketKey) =>
							<option key={submarketKey} value={submarketKey}>
								{submarket.get('display_name')}
							</option>
						)}
					</optgroup>
				))}
			</select>
		);
	}
}
