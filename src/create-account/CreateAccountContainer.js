import React, { Component } from 'react';
import CreateAccountCard from './CreateAccountCard';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import createAccountSelectors from './createAccountSelectors';

@connect(createAccountSelectors)
export default class CreateAccountContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <CreateAccountCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
