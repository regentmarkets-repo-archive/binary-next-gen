import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({ assets: state.assets }))
export default class MarketSelector extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		showAllOption: React.PropTypes.bool.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.assets !== this.props.assets;
	}

	render() {
		const {assets, onChange, showAllOption} = this.props;
		const tree = assets.get('tree').toJS();

		return (
			<select className="market-submarket-selector" onChange={e => onChange(e.target.value)}>
				{showAllOption ? <option value="">All</option> : null}
				{Object.keys(tree).map(market => (
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
