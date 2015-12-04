import React from 'react';

export default class Resizer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mouseDown: true,
		};
	}

	render() {
		return (
			<div className="resizer-vertical"
				onMouseDown={e => console.log(e)}
				onMouseMove={e => console.log(e)}>
			</div>
		);
	}
}
