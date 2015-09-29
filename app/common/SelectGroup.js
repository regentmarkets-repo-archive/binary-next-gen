import React from 'react';

const SelectGroup = (props) => {
	const { id, label, hint, value, items, readOnly, placeholder, onChange } = props;

	return (
		<fieldset>
            {label && <label htmlFor={id}>{label}</label>}
			<select id={id} readOnly={readOnly} placeholder={placeholder} onChange={onChange} defaultValue={value}>
				{ items.map(i => <option key={i.value} value={i.value}>{i.text}</option> ) }
			</select>
			{hint && <p className="hint">{hint}</p>}
		</fieldset>
	);
};

SelectGroup.propTypes = {
	items: React.PropTypes.array,
	id: React.PropTypes.string,
	label: React.PropTypes.string,
	hint: React.PropTypes.string,
	value: React.PropTypes.string,
	readOnly: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	onChange: React.PropTypes.func,
};

export default SelectGroup;
