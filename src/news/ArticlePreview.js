import React, { PropTypes, PureComponent } from 'react';

export default class ArticlePreview extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    };
    click(oAuthUrl) {
        window.open(oAuthUrl, '_blank', 'location=yes');
    }
    render() {
        const { description, title, url } = this.props;

        return (
            <a className="article-preview" onClick={() => this.click(url)}>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </a>
        );
    }
}
