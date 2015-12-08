import React, { PropTypes } from 'react';

const SelectGroup = ({ id, label, hint, value, options, readOnly, placeholder, onChange }) => (
	<fieldset>
        {label && <label htmlFor={id}>{label}</label>}
		<select id={id} readOnly={readOnly} placeholder={placeholder} onChange={onChange} value={value}>
			{options.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
		</select>
		{hint && <p className="hint">{hint}</p>}
	</fieldset>
);

SelectGroup.propTypes = {
	hint: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.string,
};

export default SelectGroup;
