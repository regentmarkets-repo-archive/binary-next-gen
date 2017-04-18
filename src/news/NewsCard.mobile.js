import React, { PureComponent } from 'react';
import ArticlePreview from './ArticlePreview';

export default class NewsCard extends PureComponent {
    props: {
        articles: any[],
    };

    static contextTypes = {
        router: any,
    };

    render() {
        const { articles } = this.props;
        const { router } = this.context;

        return (
            <div className="news-list-card scrollable">
                {articles.map((article, idx) => (
                    <ArticlePreview
                        key={'article' + idx}
                        {...article}
                        onClick={() => router.push(`/article?id=${idx}`)}
                    />
                ))}
            </div>
        );
    }
}
