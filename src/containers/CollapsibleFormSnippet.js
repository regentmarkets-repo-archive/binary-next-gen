import React, { Component, PropTypes } from 'react';

export default class CollapsibleFormSnippet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
        };
    }

    static propTypes = {
        children: PropTypes.any.isRequired,
        className: PropTypes.string,
        label: PropTypes.string,
        show: PropTypes.bool,
    };

    toggle() {
        const { show } = this.state;
        this.setState({ show: !show });
    }

    render() {
        const { children, className, label } = this.props;
        const { show } = this.state;
        return (
            <fieldset className="snippet collapsible">
                <div className="collapsible-title" onClick={::this.toggle}>{label}</div>
                {show && <div className={className}>{children}</div>}
            </fieldset>
        );
    }
}
