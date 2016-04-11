import React, { PropTypes, Component } from 'react';
import { Direction, NumberPlain } from './';
import directionClassName from 'binary-utils/lib/directionClassName';

export default class DirectionAndValue extends Component {

	static propTypes = {
		diff: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
	};

	render() {
		const { diff, value } = this.props;
		return (
			<span>
				<Direction diff={diff} />
				<NumberPlain className={directionClassName(diff)} value={value} />
			</span>
		);
	}
}
