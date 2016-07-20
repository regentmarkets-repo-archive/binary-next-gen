import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

export default class ArticlePreview extends Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        link: PropTypes.string,
        onClick: PropTypes.func,
    };

    render() {
        const { description, title, link, onClick } = this.props;
        return (
            <Link className="article-preview" to={link} onClick={onClick}>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </Link>
        );
    }
}
