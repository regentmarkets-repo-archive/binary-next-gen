import React, { PropTypes } from 'react';
import ArticlePreview from './ArticlePreview';

export default class NewsCard extends React.Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
    };

    render() {
        const { articles } = this.props;
        return (
            <div>
                {articles.map((article, idx) =>
                    <ArticlePreview key={'article' + idx} {...article} />
                )}
            </div>
        );
    }
}
