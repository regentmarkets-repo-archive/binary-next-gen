import React, { PropTypes } from 'react';
import ArticlePreview from './ArticlePreview';

export default class NewsCard extends React.Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        history: PropTypes.object,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    render() {
        const { articles } = this.props;
        const { router } = this.context;

        return (
            <div>
                {articles.map((article, idx) =>
                    <ArticlePreview
                        key={'article' + idx}
                        {...article}
                        onClick={() => router.push(`/article/${idx}`)}
                    />
                )}
            </div>
        );
    }
}
