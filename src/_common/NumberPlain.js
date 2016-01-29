import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { FormattedNumber } from 'react-intl';

export default class NumberPlain extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		currency: PropTypes.string,
		value: PropTypes.any,
		digits: PropTypes.number,
		className: PropTypes.string,
	};

	static defaultProps = {
		digits: 2,
	};

	render() {
		const { currency, className, digits } = this.props;
		const value = +this.props.value;

		// if (value < 0) {
			// formattedValue = '(' + formattedValue.substring(1) + ')';
		// }

		return (
			<span className={className}>
				{value === 0 || value ? <FormattedNumber
					style={currency && 'currency'}
					currency={currency}
					value={value}
					minimumFractionDigits={digits}
					maximumFractionDigits={digits}
				/> : null}
			</span>
		);
	}
}
