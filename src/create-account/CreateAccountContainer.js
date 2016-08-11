import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import storage from '../_store/storage';
import countryListSelector from './countryListSelector';
import CreateAccountCard from './CreateAccountCard';

@connect(countryListSelector)
export default class CreateAccountContainer extends PureComponent {

	render() {
		const utm = JSON.parse(storage.getItem('utm'));
		return (
			<CreateAccountCard {...utm} {...immutableChildrenToJS(this.props)} />
		);
	}
}
