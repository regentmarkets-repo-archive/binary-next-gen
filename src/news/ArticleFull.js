import React, { PropTypes, PureComponent } from 'react';

export default class ArticleFull extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        pubDate: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
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
