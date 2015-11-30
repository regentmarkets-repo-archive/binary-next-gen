import React from 'react';
import RadioItem from './RadioItem';

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
		const {className, onChange, name, options, value} = this.props;

		return (
			<fieldset className={className}>
				{options.map(o =>
					<RadioItem
						key={o.value}
						defaultChecked={o.value === value}
						img={o.img}
						label={o.text}
						name={name}
						onChange={onChange}
						value={o.value} />
				)}
			</fieldset>
		);
	}
}
