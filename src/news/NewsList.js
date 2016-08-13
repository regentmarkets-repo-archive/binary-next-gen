import React, { PropTypes, PureComponent } from 'react';
import ArticlePreview from './ArticlePreview';

export default class NewsList extends PureComponent {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        onClick: PropTypes.func,
    };

    render() {
        const { articles, onClick } = this.props;

        return (
            <div className="news-list">
                {articles.map((article, idx) =>
                    <ArticlePreview
                        key={'article' + idx}
                        {...article}
                        onClick={onClick}
                    />
                )}
            </div>
        );
    }
}
