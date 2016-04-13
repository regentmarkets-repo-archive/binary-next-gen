import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import M from '../_common/M';

export default class SideBarBtn extends Component {

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
			<img src={img} role="presentation" />
				<M m={text} />
			</Link>
		);
	}
}
