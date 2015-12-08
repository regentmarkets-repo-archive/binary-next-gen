import React, { PropTypes } from 'react';

export default class NavButton extends React.Component {

	static propTypes = {
		img: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
	};

	render() {
		const { img, text } = this.props;
		return (
			<button className="toolbar-btn">
				<img className="toolbar-img" src={`img/${img}.svg`} />
				<span className="toolbar-hint">{text}</span>
			</button>
		);
	}
}
