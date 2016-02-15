import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import Article from './Article';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class ArticleContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <Article {...immutableChildrenToJS(this.props)} />
        );
    }
}
