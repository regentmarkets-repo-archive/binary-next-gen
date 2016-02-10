import React, { PropTypes } from 'react';

export default class Tab extends React.Component {

    static propTypes = {
        imgSrc: PropTypes.string,
        selected: PropTypes.bool,
        showIcon: PropTypes.bool,
        showText: PropTypes.bool,
        text: PropTypes.string,
        onMouseDown: PropTypes.func,
    };

    static defaultProps = {
        showText: true,
        showIcon: true,
    };

    render() {
        const { imgSrc, selected, showIcon, showText, text, onMouseDown } = this.props;

        return (
            <div
                role="tab"
                aria-selected={selected}
                onMouseDown={onMouseDown}
            >
                {showIcon && imgSrc && <img src={imgSrc} />}
                {showText && text && <span>{text}</span>}
            </div>
        );
    }
}
