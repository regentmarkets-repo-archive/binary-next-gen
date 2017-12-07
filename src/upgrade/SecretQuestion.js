import React, { PureComponent } from 'react';
import { SelectGroup } from 'binary-components';

export default class SecretQuestion extends PureComponent {

	props: {
		value: string,
		id: string,
		options: any[],
		onChange: (e: SyntheticEvent) => void,
	};

	render() {
		const { onChange, value, id, options } = this.props;
		return (
			<SelectGroup id={id} value={value} options={options} onChange={onChange} />
		);
	}
}
