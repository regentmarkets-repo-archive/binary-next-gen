import React, { PropTypes } from 'react';
import M from './M';

const SelectGroup = ({ className, id, label, hint, value, options, optgroups, readOnly, placeholder, onChange }) => (
	<fieldset className={className}>
        {label && <label htmlFor={id}>
			<M m={label} />
		</label>}
		<select id={id} readOnly={readOnly} placeholder={placeholder} onChange={onChange} value={value}>
			{options.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
			{Object.keys(optgroups).map(grp =>
				<optgroup key={grp} label={grp}>
					{optgroups[grp].map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
				</optgroup>
			)}
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
	optgroups: PropTypes.object,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.string,
};

SelectGroup.defaultProps = {
	options: [],
	optgroups: {},
};

export default SelectGroup;
