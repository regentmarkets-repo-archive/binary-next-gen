import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import NumberPlain from './NumberPlain';
import { directionClassName } from '../_utils/StyleUtils';

export default class NumberColored extends React.Component {
	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		value: PropTypes.any,
		currency: PropTypes.any,
		isProfit: PropTypes.func,
	};

	render() {
		const { value, currency, isProfit } = this.props;

		return (
			<NumberPlain className={directionClassName(isProfit(value))} value={value} currency={currency} />
		);
	}
}

NumberColored.defaultProps = {
	isProfit: v => v,
};
