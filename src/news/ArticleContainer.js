import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import Article from './Article';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class ArticleContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <Article {...immutableChildrenToJS(this.props)} />
        );
    }
}
