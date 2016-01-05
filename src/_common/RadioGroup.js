import React, { PropTypes } from 'react';
import RadioItem from './RadioItem';

export default class RadioGroup extends React.Component {

	static propTypes = {
		className: PropTypes.string,
		name: PropTypes.string,
		text: PropTypes.string,
		img: PropTypes.string,
		options: PropTypes.any.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.any,
	};

	static defaultProps = {
		className: 'radio-selector',
	};

	render() {
		const { className, onChange, name, options, value } = this.props;
		return (
			<div className={className}>
				{options.map(o =>
					<RadioItem
						key={name + o.value}
						defaultChecked={o.value === value}
						img={o.img}
						label={o.text}
						name={name}
						onChange={onChange}
						value={o.value}
					/>
				)}
			</div>
		);
	}
}
