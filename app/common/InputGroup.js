import React from 'react';

export default class InputGroup extends React.Component {

	static propTypes = {
		id: React.PropTypes.string.isRequired,
		label: React.PropTypes.string,
		type: React.PropTypes.string,
		hint: React.PropTypes.string,
		value: React.PropTypes.string,
		readOnly: React.PropTypes.bool
	};

	static defaultValue = {
		type: 'text'
	};

	render() {

		const { id, label, type, hint, value, readOnly } = this.props;

		return (
			<fieldset>
                {label && <label htmlFor={id}>{label}</label>}
				<input id={id} type={type} defaultValue={value} readOnly={readOnly} />
				{hint && <p className="hint">{hint}</p>}
			</fieldset>
		);
	}
}
