import React from 'react';
import { RadioGroup } from '../common';

const contractTypes = [
	{ value: 'CALL', text: 'Rise' },
	{ value: 'PUT', text: 'Fall' },
	{ value: 'DIGITMATCH', text: 'Digit Match' },
	{ value: 'DIGITDIFF', text: 'Digit Differs' },
	{ value: 'ASIANU', text: 'Asian Up' },
	{ value: 'ASIAND', text: 'Asian Down' },
];

export default class TickTradeType extends React.Component {

	render() {
		return (
			<RadioGroup name="trade-type" options={contractTypes} {...this.props}/>
		);
	}
}
