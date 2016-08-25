import React, { PropTypes, PureComponent } from 'react';

export default class ArticlePreview extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    };
    click = e => {
        const { url } = this.props;
        window.open(url, '_blank');
        e.preventDefault();
    }
    render() {
        const { description, title } = this.props;

        return (
            <a className="article-preview" onClick={this.click}>
                <h2>{title}</h2>
                <p dangerouslySetInnerHTML={{ __html: description }} />
            </a>
        );
    }
}
