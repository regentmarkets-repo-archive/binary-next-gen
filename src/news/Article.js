import React from 'react';

export default class articles extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        pubDate: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
    };

    render() {
        const { title, pubDate, content } = this.props;

        return (
            <div>
                <h2>{title}</h2>
                <p>{pubDate}</p>
                <p dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
    }
}
