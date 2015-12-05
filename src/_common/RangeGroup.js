import React from 'react';

const RangeGroup = ({ id, label, hint, value, min, max, step, items, readOnly, onChange }) => (
	<div className="range-selector">
        {label && <label htmlFor={id}>{label}</label>}
		<br />
		<input type="range" defaultValue={value} readOnly={readOnly} onChange={onChange} min={min} max={max} step={step} />
		<div className="range-selector-items">
			{ items.map(i => <label key={i}>{i}</label>) }
		</div>
		{hint && <p className="hint">{hint}</p>}
	</div>
);

RangeGroup.propTypes = {
	items: React.PropTypes.array,
	id: React.PropTypes.string,
	label: React.PropTypes.string,
	hint: React.PropTypes.string,
	value: React.PropTypes.number,
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	step: React.PropTypes.number,
	readOnly: React.PropTypes.bool,
	onChange: React.PropTypes.func,
};

export default RangeGroup;
