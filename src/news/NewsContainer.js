import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import NewsCard from './NewsCard';

@connect(state => ({ articles: state.news.get('articles') }))
export default class NewsContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        console.log('news updating');
        return (
            <NewsCard {...this.props} />
        );
    }
}
