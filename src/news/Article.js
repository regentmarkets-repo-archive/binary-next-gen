import React, { PropTypes, Component } from 'react';

export default class Article extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        params: PropTypes.object.isRequired,
    };

    render() {
        const { articles } = this.props;
        const { index } = this.props.params;
        const { content, pubDate, title } = articles[index];

        return (
            <div className="article">
                <h1>{title}</h1>
                <p>{pubDate}</p>
                <p dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }
}
