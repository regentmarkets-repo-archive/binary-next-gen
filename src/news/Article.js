import React, { PropTypes, Component } from 'react';

export default class Article extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        params: PropTypes.object.isRequired,
    };

    render() {
        const { articles } = this.props;
        const { index } = this.props.params;
        const { description, pubDate, title } = articles[index];

        return (
            <div>
                <h2>{title}</h2>
                <p>{pubDate}</p>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        );
    }
}
