import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';

import Article from './Article';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class ArticleContainer extends PureComponent {

    render() {
        return (
            <Article {...immutableChildrenToJS(this.props)} />
        );
    }
}
