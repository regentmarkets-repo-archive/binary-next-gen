import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import classnames from 'classnames';
import errorToString from 'binary-utils/lib/errorToString';

export default class ErrorMsg extends Component {

	static propTypes = {
		className: PropTypes.string,
		text: PropTypes.string,
	};

	render() {
		const { text, className } = this.props;

		if (!text) return null;

		return (
			<p className={classnames('errorfield', className)}>
				<M m={errorToString(text)} />
			</p>
		);
	}
}
