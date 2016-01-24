import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import assetSelectors from '../_selectors/AssetSelectors';

@connect(assetSelectors)
export default class MarketPicker extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		marketTree: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired,
		showAllOption: PropTypes.bool.isRequired,
		showMarkets: PropTypes.array,
		value: PropTypes.string,
	};

	render() {
		const { marketTree, onChange, showAllOption, showMarkets, value } = this.props;

		return (
			<select className="market-submarket-picker" onChange={e => onChange(e.target.value)} value={value}>
				{showAllOption ?
					<FormattedMessage id="All" defaultMessage="All">
						{message => <option value="">{message}</option>}
					</FormattedMessage>
				: null}
				{Object
					.keys(marketTree)
					.filter(market => !showMarkets || ~showMarkets.indexOf(market))
					.map(market => (
					<optgroup key={market} label={marketTree[market].display_name}>
						{Object.keys(marketTree[market].submarkets).map(submarket =>
							<option key={submarket} value={submarket}>
								{marketTree[market]
									.submarkets[submarket]
									.display_name}
							</option>
						)}
					</optgroup>
				))}
			</select>
		);
	}
}
