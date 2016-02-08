import React from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import shouldPureComponentUpdate from 'react-pure-render/function';
import StatementCard from './StatementCard';
import statementSelectors from './StatementSelectors';

@connect(statementSelectors)
export default class StatementContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return <StatementCard {...immutableChildrenToJS(this.props)} />;
	}
}
