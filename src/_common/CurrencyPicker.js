import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SelectGroup, RadioGroup } from '../_common';

@connect(state => ({ account: state.account }))
export default class CurrencyPicker extends React.Component {

	static propTypes = {
		account: PropTypes.object,
		onChange: PropTypes.func,
		radio: PropTypes.bool,
		value: PropTypes.string,
	};

	render() {
		const { account, onChange, radio, value } = this.props;
		const currencies = account
			.get('currencies')
			.map(x => ({ value: x, text: x }));

		return radio ? (
			<RadioGroup name="currency-picker" options={currencies} value={value} onChange={onChange} />
		) : (
			<SelectGroup options={currencies} value="USD" onChange={onChange} />
		);
	}
}
