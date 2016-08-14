import React, { PropTypes, PureComponent } from 'react';
import { M, P } from 'binary-components';

export default class UpdateNotice extends PureComponent {

	static propTypes = {
		img: PropTypes.string,
		title: PropTypes.string,
		text: PropTypes.string.isRequired,
		show: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = {
			shown: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { shown } = this.state;
		if (nextProps.show && !shown) this.showNotice();
	}

	showNotice = () => {
		this.setState({ show: true });
		setTimeout(() => this.setState({ show: false }), 2000);
	}

	render() {
		const { img, title, text } = this.props;

		if (!this.state.show) return null;

		return (
			<div className="update-notice notice-msg">
				<img src={img} alt={title} />
				{title && <h5><M m={title} /></h5>}
				<P text={text} />
			</div>
		);
	}
}
