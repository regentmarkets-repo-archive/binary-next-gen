import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import NewsCard from './NewsCard';

@connect(state => ({ news: state.news }))
export default class NewsContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <NewsCard {...this.props} />
        );
    }
}
