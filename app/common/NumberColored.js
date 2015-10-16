import React from 'react';
import NumberPlain from './NumberPlain';

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
		const {value, currency} = this.props;
		const className = (value < 0 && 'number-negative') || (value > 0 && 'number-positive') || '';
		return (
			<NumberPlain className={className} value={value} currency={currency} />
		);
	}
}
