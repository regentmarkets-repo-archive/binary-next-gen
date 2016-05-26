import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import classnames from 'classnames';
import errorToString from 'binary-utils/lib/errorToString';

export default class ErrorMsg extends Component {
	static propTypes = {
		className: PropTypes.string,
		shown: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired,
	};
	render() {
		const { shown, text, className } = this.props;
		return shown ? <p className={classnames('errorfield', className)}><M m={errorToString(text)} /></p> : null;
	}
}
