import React, { PureComponent } from 'react';
import ArticleFull from './ArticleFull';

export default class NewsCard extends PureComponent {

    props: {
        articles: any[],
    };

    static contextTypes = {
        router: () => undefined,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeArticleIndex: 0,
        };
    }

    handleChangeArticle = (e: SyntheticEvent) =>
        this.setState({ activeArticleIndex: e.target.value });

    // onClickBack = () =>
    //     this.setState({ showArticle: false, params: { index: 0 } });

    render() {
        const { articles } = this.props;
        const { activeArticleIndex } = this.state;

        return (
            <div className="news-list-card">
                <select className="article-picker" onChange={this.handleChangeArticle}>
                  {articles.map((x, idx) =>
                    <option key={idx} value={idx}>{x.title}</option>
                  )}
                </select>
                <div className="scrollable">
                    <ArticleFull
                        index={activeArticleIndex}
                        {...articles[activeArticleIndex]}
                    />
                </div>
            </div>
        );
    }
}
