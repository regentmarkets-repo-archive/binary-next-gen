import React from 'react';

const InputGroup = ({ autoFocus, id, className, label, type, hint, value, min, max, readOnly, placeholder, onChange }) => (
	<fieldset className={className}>
        {label && <label htmlFor={id}>{label}</label>}
		<input
			autoFocus={autoFocus}
			id={id}
			type={type}
			defaultValue={value}
			readOnly={readOnly}
			placeholder={placeholder}
			onChange={onChange}
			min={min}
			max={max}
		/>
		{hint && <p className="hint">{hint}</p>}
	</fieldset>
);

const valueTypes = [React.PropTypes.number, React.PropTypes.object, React.PropTypes.string];

InputGroup.propTypes = {
	autoFocus: React.PropTypes.bool,
	type: React.PropTypes.string,
	id: React.PropTypes.string,
	className: React.PropTypes.string,
	label: React.PropTypes.string,
	hint: React.PropTypes.string,
	value: React.PropTypes.oneOfType(valueTypes),
	min: React.PropTypes.oneOfType(valueTypes),
	max: React.PropTypes.oneOfType(valueTypes),
	readOnly: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	onChange: React.PropTypes.func,
};

export default InputGroup;
