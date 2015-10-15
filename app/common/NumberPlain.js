import React from 'react';

export default class NumberPlain extends React.Component {

	static propTypes = {
		currency: React.PropTypes.string,
		value: React.PropTypes.any,
		className: React.PropTypes.string,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.value !== this.props.value &&
			nextProps.currency !== this.props.currency &&
			nextProps.className !== this.props.className;
	}

	render() {
		const {currency, className} = this.props;
		const value = +this.props.value;

		if (isNaN(value)) {
			return <span />;
		}

		let formattedValue = value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		if (value < 0) {
			formattedValue = '(' + formattedValue.substring(1) + ')';
		}

		return (
			<span className={className}>{currency} {formattedValue}</span>
		);
	}
}
