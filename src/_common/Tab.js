import React, { PropTypes } from 'react';

export default class Tab extends React.Component {

    static propTypes = {
        imgSrc: PropTypes.string,
        selected: PropTypes.bool,
        text: PropTypes.string,
        onMouseDown: PropTypes.func.isRequired,
    };

    render() {
        const { imgSrc, selected, text, onMouseDown } = this.props;

        return (
            <div
                role="tab"
                aria-selected={selected}
                onMouseDown={onMouseDown}
            >
                {imgSrc && <img src={imgSrc} />}
                {text && <span>{text}</span>}
            </div>
        );
    }
}
