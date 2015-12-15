import React, { PropTypes } from 'react';

export default class ArticlePreview extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        pubDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    };

    render() {
        const { title, pubDate, description } = this.props;

        return (
            <div className="article-preview">
                <h2>{title}</h2>
                <p>{pubDate}</p>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        );
    }
}
