import React from 'react';
import M from './M';

const SelectGroup = ({ id, label, hint, value, options, readOnly, placeholder, onChange }) => (
	<fieldset>
        {label && <label htmlFor={id}>
			<M m={label} />
		</label>}
		<select id={id} readOnly={readOnly} placeholder={placeholder} onChange={onChange} value={value}>
			{options.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
		</select>
		{hint && <p className="hint">{hint}</p>}
	</fieldset>
);

SelectGroup.propTypes = {
	hint: React.PropTypes.string,
	id: React.PropTypes.string,
	label: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array,
	placeholder: React.PropTypes.string,
	readOnly: React.PropTypes.bool,
	value: React.PropTypes.string,
};

export default SelectGroup;
