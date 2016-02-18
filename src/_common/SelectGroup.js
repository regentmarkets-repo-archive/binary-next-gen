import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import M from './M';

export default class SelectGroup extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		hint: PropTypes.string,
		id: PropTypes.string,
		className: PropTypes.string,
		label: PropTypes.string,
		onChange: PropTypes.func,
		options: PropTypes.array,
		optgroups: PropTypes.object,
		placeholder: PropTypes.string,
		readOnly: PropTypes.bool,
		value: PropTypes.string,
	};

	static defaultProps = {
		options: [],
		optgroups: {},
	};

	render() {
		const { className, id, label, hint, value, options, optgroups, readOnly, placeholder, onChange } = this.props;

		return (
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
	}
}
