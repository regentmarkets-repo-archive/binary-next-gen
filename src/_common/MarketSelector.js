import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

@connect(state => ({ assets: state.assets }))
export default class MarketSelector extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired,
		showAllOption: PropTypes.bool.isRequired,
		showMarkets: PropTypes.array,
	};

	render() {
		const { assets, onChange, showAllOption, showMarkets } = this.props;
		const tree = assets.get('tree').toJS();

		return (
			<select className="market-submarket-selector" onChange={e => onChange(e.target.value)}>
				{showAllOption ?
					<FormattedMessage id="All" defaultMessage="All">
						{message => <option value="">{message}</option>}
					</FormattedMessage>
				: null}
				{Object
					.keys(tree)
					.filter(market => !showMarkets || ~showMarkets.indexOf(market))
					.map(market => (
					<optgroup key={market} label={market}>
						{Object.keys(tree[market]).map(submarket =>
							<option key={submarket} value={submarket}>{submarket}</option>
						)}
					</optgroup>
				))}
			</select>
		);
	}
}
