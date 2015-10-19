import React from 'react';

export default class RadioGroup extends React.Component {

	static propTypes = {
		value: React.PropTypes.string,
		className: React.PropTypes.string,
		options: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func.isRequired,
	};

	render() {
		const {className, onChange, options, value} = this.props;

		return (
			<fieldgroup className={className}>
				{options.map(o =>
					<span key={o.value}>
						<input id={o.value}
							type="radio"
							name="12345"
							value={o.value}
							defaultChecked={o.value === value}
							onChange={onChange} />
						<label htmlFor={o.value}>{o.text}</label>
					</span>
				)}
			</fieldgroup>
		);
	}
}
