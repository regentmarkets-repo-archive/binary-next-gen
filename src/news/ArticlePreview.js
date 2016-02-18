import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

export default class ArticlePreview extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    };

    render() {
        const { description, title } = this.props;

        return (
            <Link className="article-preview" to="/article/0">
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </Link>
        );
    }
}
