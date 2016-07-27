import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import countryListSelector from './countryListSelector';
import CreateAccountCard from './CreateAccountCard';

@connect(countryListSelector)
export default class CreateAccountContainer extends PureComponent {

	render() {
		return (
			<CreateAccountCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
