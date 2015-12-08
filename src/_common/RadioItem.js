import React, { PropTypes } from 'react';
import M from '../_common/M';

export default class RadioItem extends React.Component {

	static propTypes = {
		checked: PropTypes.bool,
		defaultChecked: PropTypes.bool,
		img: PropTypes.string,
		label: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.any.isRequired,
	};

	render() {
		const { checked, defaultChecked, img, label, name, onChange, value } = this.props;
		return (
			<span className="radio-item">
				<input id={value}
					checked={checked}
					type="radio"
					name={name}
					value={value}
					defaultChecked={defaultChecked}
					onChange={onChange}
				/>
				<label htmlFor={value}>
					{img ? <img src={img}/> : '' }
					<M m={label} />
				</label>
			</span>
		);
	}
}
