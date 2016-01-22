import React, { PropTypes } from 'react';

export default class Article extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        pubDate: PropTypes.string,
        content: PropTypes.string,
    };

    render() {
        const { content, pubDate, title } = this.props;

        return (
            <div>
                <h2>{title}</h2>
                <p>{pubDate}</p>
                <p dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }
}
