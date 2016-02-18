import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SelectGroup from '../_common/SelectGroup';
import RadioGroup from '../_common/RadioGroup';

@connect(state => ({ account: state.account }))
export default class CurrencyPicker extends Component {

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
