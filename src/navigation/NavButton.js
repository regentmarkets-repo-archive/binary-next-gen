import React from 'react';

export default class NavButton extends React.Component {

	static propTypes = {
		img: React.PropTypes.string.isRequired,
		text: React.PropTypes.string.isRequired,
	};

	render() {
		const {img, text} = this.props;
		return (
			<button className="toolbar-btn">
				<img className="toolbar-img" src={`/img/${img}.svg`} />
				<span className="toolbar-hint">{text}</span>
			</button>
		);
	}
}
