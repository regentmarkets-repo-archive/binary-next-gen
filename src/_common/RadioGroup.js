import React from 'react';

export default class RadioGroup extends React.Component {

	static propTypes = {
		className: React.PropTypes.string,
		name: React.PropTypes.string,
		text: React.PropTypes.string,
		img: React.PropTypes.string,
		options: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func.isRequired,
		value: React.PropTypes.any,
	};

	static defaultProps = {
		className: 'radio-selector',
	}

	render() {
		const {className, onChange, options, name, value} = this.props;

		return (
			<fieldgroup className={className}>
				{options.map(o =>
					<span key={o.value}>
						<input id={o.value}
							type="radio"
							name={name}
							value={o.value}
							defaultChecked={o.value === value}
							onChange={onChange} />
						<label htmlFor={o.value}>
							{o.img && <img src={o.img} />}
							{o.text}
						</label>
					</span>
				)}
			</fieldgroup>
		);
	}
}
