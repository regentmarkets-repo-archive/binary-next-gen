import React from 'react';
import { connect } from 'react-redux';
import { SelectGroup } from '../common';

@connect(state => ({ account: state.account }))
export default class CurrencySelector extends React.Component {

	static propTypes = {
		account: React.PropTypes.object,
	};

	render() {
		const currencies = this.props.account
			.get('currencies')
			.map(x => ({ value: x, text: x }));

		return (
			<SelectGroup items={currencies} value="USD" />
		);
	}
}
