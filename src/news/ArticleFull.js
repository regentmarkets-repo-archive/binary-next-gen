import React, { PropTypes, PureComponent } from 'react';

export default class Article extends PureComponent {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        params: PropTypes.object.isRequired,
    };

    render() {
        const { content, pubDate, title } = this.props;

        return (
            <div className="article">
                <h1>{title}</h1>
                <p>{pubDate}</p>
                <p dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }
}
