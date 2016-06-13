import React, { PropTypes, Component } from 'react';
import ArticlePreviewMobile from './ArticlePreviewMobile';

export default class NewsCardMobile extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    render() {
        const { articles } = this.props;
        const { router } = this.context;

        return (
            <div className="news-list-card">
                {articles.map((article, idx) =>
                    <ArticlePreviewMobile
                        key={'article' + idx}
                        {...article}
                        onClick={() => router.push(`/article/${idx}`)}
                        link={'/article/' + idx}
                    />
                )}
            </div>
        );
    }
}
