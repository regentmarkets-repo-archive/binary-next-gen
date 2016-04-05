import React, { PropTypes, Component } from 'react';
import RadioItem from './RadioItem';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class RadioGroup extends Component {

	static propTypes = {
		className: PropTypes.string,
		name: PropTypes.string.isRequired,
		text: PropTypes.string,
		img: PropTypes.string,
		options: PropTypes.any.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.any,
	};

	static defaultProps = {
		className: 'radio-selector',
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const { className, onChange, name, options, value } = this.props;
		return (
			<div className={className}>
				{options.map(o =>
					<RadioItem
						key={name + o.value}
						checked={o.value === value}
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
