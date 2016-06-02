import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import classNames from 'classnames';
import NumberPlain from './NumberPlain';
import directionClassName from 'binary-utils/lib/directionClassName';


export default class NumberColored extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		value: PropTypes.any,
		currency: PropTypes.any,
		isProfit: PropTypes.func,
		className: PropTypes.string,
	};

	static defaultProps = {
		isProfit: v => v,
	};

	render() {
		const { value, currency, isProfit, className } = this.props;
		const classes = classNames({
			[directionClassName(isProfit(value))]: true,
			[className]: className,
		});

		return (
			<NumberPlain className={classes} value={value} currency={currency} />
		);
	}
}
