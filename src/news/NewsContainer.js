import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import NewsCard from './NewsCard';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class NewsContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <NewsCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
