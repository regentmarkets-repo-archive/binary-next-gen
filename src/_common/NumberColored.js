import React from 'react';
import NumberPlain from './NumberPlain';
import { directionClassName } from '../_utils/StyleUtils';

export default class NumberColored extends React.Component {

	static propTypes = {
		value: React.PropTypes.any,
		currency: React.PropTypes.any,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.value !== this.props.value ||
			nextProps.currency !== this.props.currency;
	}

	render() {
		const { value, currency } = this.props;

		return (
			<NumberPlain className={directionClassName(value)} value={value} currency={currency} />
		);
	}
}
