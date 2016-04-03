import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

export default class ArticlePreview extends Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        link: PropTypes.string,
    };

    render() {
        const { description, title, link } = this.props;
        return (
            <Link className="article-preview" to={link}>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </Link>
        );
    }
}
