import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import StatementCard from './StatementCard';
import statementSelectors from './statementSelectors';

@connect(statementSelectors)
export default class StatementContainer extends PureComponent {
    render() {
        return <StatementCard {...immutableChildrenToJS(this.props)} />;
    }
}
