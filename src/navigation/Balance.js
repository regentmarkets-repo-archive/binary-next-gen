import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NumberPlain } from '../_common';
import shouldPureComponentUpdate from 'react-pure-render/function';

@connect(state => ({ account: state.account }))
export default class Balance extends React.Component {

	static propTypes = {
		account: PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const account = this.props.account.toJS();

		return (
			<NumberPlain
				className="balance"
				currency={account.currency}
				value={account.balance}
			/>
		);
	}
}
