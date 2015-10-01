import React from 'react';
import { connect } from 'react-redux';
import BalanceDisplay from './BalanceDisplay';

@connect(state => ({ account: state.account }))
export default class NavigationMenu extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
				<BalanceDisplay account={this.props.account} />
				<button>Trade</button>
				<button>Open Positions</button>
				<button>Statement?!?</button>
				<button>Trade</button>
				<button>Trade</button>
				<button>Sign Out</button>
			</div>
		);
	}
}
