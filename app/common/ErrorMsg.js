import React from 'react';

export default class ErrorMsg {

	static propTypes = {
		shown: React.PropTypes.bool.isRequired,
		text: React.PropTypes.string.isRequired,
	};

	render() {
		const { shown, text } = this.props;

		if (!shown) return <span />;

		return (
			<p className="errorfield">
				{text}
			</p>
		);
	}
}
