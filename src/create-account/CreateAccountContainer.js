import React from 'react';
import CreateAccountCard from './CreateAccountCard';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import createAccountSelectors from './createAccountSelectors';

@connect(createAccountSelectors)
export default class CreateAccountContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <CreateAccountCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
