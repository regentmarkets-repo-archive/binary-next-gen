import React from 'react';

export default class RadioItem extends React.Component {

	static propTypes = {
		defaultChecked: React.PropTypes.bool,
		img: React.PropTypes.string,
		label: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		value: React.PropTypes.any.isRequired,
	};

	render() {
		const {defaultChecked, img, label, name, onChange, value} = this.props;
		return (
			<div className="radio-item">
				<input id={value}
					type="radio"
					name={name}
					value={value}
					defaultChecked={defaultChecked}
					onChange={onChange} />
				<label
					htmlFor={value}
					dangerouslySetInnerHTML={{__html: (img ? `<img src=${img}>` : '') + label}}>
				</label>
			</div>
		);
	}
}
