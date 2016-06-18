import React, { PropTypes, Component } from 'react';
import ArticlePreview from './ArticlePreview';
import Article from './Article';
import { Link } from 'react-router';
import M from 'binary-components/lib/M';

export default class NewsCard extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showArticle: false,
            params: { index: 0 },
        };
    }

    onClickBack = e => {
        e.preventDefault();
        this.setState({ showArticle: false, params: { index: 0 } });
    };

    render() {
        const { articles } = this.props;
        const { showArticle, params } = this.state;

        return showArticle ?
            <div>
                <div className="mobile-toolbar">
                    <Link
                        to={'/'}
                        activeClassName="active"
                        className="mobile-back-btn"
                        onClick={this.onClickBack}
                    >
                        <img className="back-btn" src="/img/arrow-back.svg" alt="Back" />
                        <M m="Back" />
                    </Link>
                </div>
                <Article
                    articles={articles}
                    params={params}
                />
            </div>
        :
        <div className="news-list-card">
            {articles.map((article, idx) =>
                <ArticlePreview
                    key={'article' + idx}
                    {...article}
                    onClick={() => this.setState({ showArticle: true, params: { index: idx } })}
                    link="/"
                />
            )}
        </div>;
    }
}
