import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Article from './Article';
import { getArticle } from '../_reducers/NewsReducers';

@connect(state => ({ ...getArticle(state, 0) }))
export default class ArticleContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <Article {...this.props} />
        );
    }
}
