import React, { PropTypes, PureComponent } from 'react';

export default class ArticlePreview extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        index: PropTypes.number,
        onClick: PropTypes.func,
    };

    render() {
        const { description, title, link, onClick } = this.props;
        return (
            <div className="article-preview" to={link} onClick={onClick}>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        );
    }
}
