import React from 'react';
import { connect } from 'react-redux';
import NewsCard from './NewsCard';

@connect(state => ({ news: state.news }))
export default class NewsContainer extends React.Component {

    static propTypes = {
        news: React.PropTypes.object.isRequired,
    };

    render() {
        return (
            <NewsCard {...this.props} />
        );
    }
}
