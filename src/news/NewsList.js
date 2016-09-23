import React, { PureComponent } from 'react';
import ArticlePreview from './ArticlePreview';

export default class NewsList extends PureComponent {

    props: {
        articles: any[],
        onClick: (e: SyntheticEvent) => void,
    };

    render() {
        const { articles, onClick } = this.props;

        return (
            <div className="news-list">
                {articles.map((article, idx) =>
                    <ArticlePreview
                        key={'article' + idx}
                        index={idx}
                        {...article}
                        onClick={onClick}
                    />
                )}
            </div>
        );
    }
}
