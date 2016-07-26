import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';

import NewsCard from './NewsCard';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class NewsContainer extends PureComponent {

    render() {
        return (
            <NewsCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
