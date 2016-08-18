import React, { PropTypes, PureComponent } from 'react';

export default class ArticlePreview extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        onClick: PropTypes.func,
    };

    onClick = () => {
        const { onClick, index } = this.props;
        onClick(index);
    }

    render() {
        const { description, title, url } = this.props;

        return (
            <a className="article-preview" target="_new" href={url}>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </a>
        );
    }
}
