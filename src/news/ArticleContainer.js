import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ArticleFull from './ArticleFull';
import newsSelectors from './newsSelectors';

@connect(newsSelectors)
export default class ArticleContainer extends PureComponent {

    static contextTypes = {
        router: () => undefined,
    };

    props: {
        articles: any[],
        params: any,
    }

    render() {
        const { articles, params } = this.props;

        return (
            <ArticleFull {...articles[params.id].toJS()} />
        );
    }
}
