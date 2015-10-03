import React from 'react';
import { connect } from 'react-redux';
import { Popup } from '../common';
import ProfitTablePane from './ProfitTablePane';

@connect(state => ({ account: state.account, portfolio: state.portfolio }))
export default class ProfitTablePopup extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
		portfolio: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<Popup>
				<ProfitTablePane {...this.props} />
			</Popup>
		);
	}
}
