import React from 'react';

export default class InputGroup extends React.Component {

	static propTypes = {
		type: React.PropTypes.string.isRequired,		
		id: React.PropTypes.string,
		label: React.PropTypes.string,
		hint: React.PropTypes.string,
		value: React.PropTypes.string,
		readOnly: React.PropTypes.bool,
		placeholder: React.PropTypes.string,
		onChange: React.PropTypes.func,
	};

	static defaultValue = {
		type: 'text'
	};

	render() {

		const { id, label, type, hint, value, readOnly, placeholder, onChange } = this.props;

		return (
			<fieldset>
                {label && <label htmlFor={id}>{label}</label>}
				<input id={id} type={type} defaultValue={value} readOnly={readOnly} placeholder={placeholder} onChange={onChange} />
				{hint && <p className="hint">{hint}</p>}
			</fieldset>
		);
	}
}
