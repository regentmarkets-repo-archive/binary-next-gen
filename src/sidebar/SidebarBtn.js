import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { M } from '../_common';

export default class SideBarBtn extends React.Component {

	static propTypes = {
		to: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	};

	render() {
		const { to, img, text } = this.props;

		return (
			<Link
				to={to}
				activeClassName="active"
				className="sidebar-btn"
			>
			<img src={img} />
				<M m={text} />
			</Link>
		);
	}
}
