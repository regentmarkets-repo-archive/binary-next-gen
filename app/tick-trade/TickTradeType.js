import React from 'react';
import { RadioGroup } from '../common';

const contractTypes = [
	{ value: 'CALL', text: 'Up' },
	{ value: 'PUT', text: 'Down' },
	{ value: 'DIGITMATCH', text: 'Digit Match' },
	{ value: 'DIGITDIFF', text: 'Digit Differs' },
];

export default class TickTradeType extends React.Component {

	render() {
		return (
			<RadioGroup options={contractTypes} {...this.props}/>
		);
	}
}
