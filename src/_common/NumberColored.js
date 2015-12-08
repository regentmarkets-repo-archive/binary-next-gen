import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import NumberPlain from './NumberPlain';
import { directionClassName } from '../_utils/StyleUtils';

export default class NumberColored extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		value: PropTypes.any,
		currency: PropTypes.any,
	};

	render() {
		const { value, currency } = this.props;

		return (
			<NumberPlain className={directionClassName(value)} value={value} currency={currency} />
		);
	}
}
