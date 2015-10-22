import React from 'react';
import { RadioGroup } from '../common';

const contractTypes = [
	{ value: 'CALL', text: 'Rise', img: '/public/trade-higher.svg' },
	{ value: 'PUT', text: 'Fall', img: '/public/trade-lower.svg' },
	{ value: 'DIGITMATCH', text: 'Digit Match', img: '/public/trade-match.svg' },
	{ value: 'DIGITDIFF', text: 'Digit Differs', img: '/public/trade-differs.svg' },
	{ value: 'ASIANU', text: 'Asian Up', img: '/public/trade-asianup.svg' },
	{ value: 'ASIAND', text: 'Asian Down', img: '/public/trade-asiandown.svg' },
];

export default class TickTradeType extends React.Component {

	render() {
		return (
			<RadioGroup name="trade-type" options={contractTypes} {...this.props}/>
		);
	}
}
