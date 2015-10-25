import React from 'react';
import { connect } from 'react-redux';
import { SelectGroup, RadioGroup } from '../_common';

@connect(state => ({ account: state.account }))
export default class CurrencySelector extends React.Component {

	static propTypes = {
		account: React.PropTypes.object,
		onChange: React.PropTypes.func,
		radio: React.PropTypes.bool,
	};

	render() {
		const {account, onChange, radio} = this.props;
		const currencies = account
			.get('currencies')
			.map(x => ({ value: x, text: x }));

		return radio ? (
			<RadioGroup options={currencies} value="USD" onChange={onChange} />
		) : (
			<SelectGroup options={currencies} value="USD" onChange={onChange} />
		);
	}
}
