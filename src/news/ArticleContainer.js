import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Article from './Article';

@connect(state => ({ article: state.WUUUUT }))
export default class ArticleContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <Article {...this.props} />
        );
    }
}
