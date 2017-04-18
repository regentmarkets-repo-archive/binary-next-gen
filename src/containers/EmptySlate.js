import React, { PureComponent } from 'react';
import { M, P } from 'binary-components';

export default class EmptySlate extends PureComponent {
    props: {
        img: string,
        title: string,
        text: string,
    };

    render() {
        const { img, title, text } = this.props;

        return (
            <div className="empty-slate">
                <img src={img} alt={title} />
                {title && <h5><M m={title} /></h5>}
                <P text={text} />
            </div>
        );
    }
}
