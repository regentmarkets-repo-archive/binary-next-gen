import React, { PropTypes } from 'react';
import M from './M';

const InputGroup = ({ autoFocus, id, className, label, type, hint, value, min, max, readOnly, placeholder, onChange }) => (
	<fieldset className={className}>
        {label && <label htmlFor={id}>
			<M m={label} />
		</label>}
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
		{hint && <p className="hint">
			<M m={hint} />
		</p>}
	</fieldset>
);

const valueTypes = [PropTypes.number, PropTypes.instanceOf(Date), PropTypes.string];

InputGroup.propTypes = {
	autoFocus: PropTypes.bool,
	type: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	label: PropTypes.string,
	hint: PropTypes.string,
	value: PropTypes.oneOfType(valueTypes),
	min: PropTypes.oneOfType(valueTypes),
	max: PropTypes.oneOfType(valueTypes),
	readOnly: PropTypes.bool,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
};

export default InputGroup;
