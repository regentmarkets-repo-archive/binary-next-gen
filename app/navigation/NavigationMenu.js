import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import BalanceDisplay from './BalanceDisplay';
import LanguagePicker from '../common/LanguagePicker';

@connect(state => ({ account: state.account }))
export default class NavigationMenu extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
			    <label>VRTC123 (switcher)</label>
				<BalanceDisplay account={this.props.account} />
				<Link to={`/tick-trade`}>Trade</Link>
				<Link to={`/portfolio`}>Open Positions</Link>
				<Link to={`/statement`}>Statement</Link>
				<LanguagePicker />
				<button>????</button>
				<button>Sign Out</button>
			</div>
		);
	}
}
