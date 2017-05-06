import React, { PureComponent } from 'react';

export default class ArticleFull extends PureComponent {

    props: {
        title: string,
        pubDate: string,
        content: string,
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
