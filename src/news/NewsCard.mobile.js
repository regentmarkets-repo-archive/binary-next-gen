import React, { PropTypes, PureComponent } from 'react';
import ArticlePreview from './ArticlePreview';

export default class NewsCard extends PureComponent {

    static propTypes = {
        articles: PropTypes.array.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    render() {
        const { articles } = this.props;
        const { router } = this.context;

        return (
            <div className="news-list-card">
                {articles.map((article, idx) =>
                    <ArticlePreview
                        key={'article' + idx}
                        {...article}
                        onClick={() => router.push(`/article?id=${idx}`)}
                    />
                )}
            </div>
        );
    }
}
