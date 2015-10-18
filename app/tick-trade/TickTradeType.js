import React from 'react';

const contractTypes = [
	{ code: 'CALL', text: 'Up' },
	{ code: 'PUT', text: 'Down' },
	{ code: 'DIGITMATCH', text: 'Digit Match' },
	{ code: 'DIGITDIFF', text: 'Digit Differs' },
];

export default class TickTradeType extends React.Component {

	static propTypes = {
		value: React.PropTypes.string,
		onChange: React.PropTypes.func.isRequired,
	};

	render() {
		const {value, onChange} = this.props;

		return (
			<fieldgroup className="trade-type-selector">
				{contractTypes.map(ct =>
					<span key={ct.code}>
						<input id={ct.code}
							type="radio"
							name="tradeType"
							value={ct.code}
							defaultChecked={ct.code === value}
							onChange={onChange} />
						<label htmlFor={ct.code}>{ct.text}</label>
					</span>
				)}
			</fieldgroup>
		);
	}
}
