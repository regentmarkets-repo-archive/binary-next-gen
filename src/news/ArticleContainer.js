import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import Article from './Article';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class ArticleContainer extends Component {

    render() {
        return (
            <Article {...immutableChildrenToJS(this.props)} />
        );
    }
}
