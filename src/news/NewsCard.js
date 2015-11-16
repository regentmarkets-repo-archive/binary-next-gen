import React from 'react';
import Article from './Article';

export default class NewsCard extends React.Component {

    static propTypes = {
        news: React.PropTypes.object.isRequired,
    };

    render() {
        const articles = this.props.news.get('articles');
        return (
            <div>
                {articles.map((article, idx) =>
                    <Article key={'article' + idx} {...article} />
                )}
            </div>
        );
    }
}
