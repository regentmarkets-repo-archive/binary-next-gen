import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import NewsCard from './NewsCard';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class NewsContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <NewsCard {...immutableChildrenToJS(this.props)} />
        );
    }
}
