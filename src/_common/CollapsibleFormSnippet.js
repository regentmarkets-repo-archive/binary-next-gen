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
        label: PropTypes.string,
        show: PropTypes.bool,
    };

    toggle() {
        const { show } = this.state;
        this.setState({ show: !show });
    }

    render() {
        const { children, label } = this.props;
        const { show } = this.state;
        return (
            <fieldset className="snippet collapsible">
                <legend className="focusable form-label" onClick={::this.toggle}>{label}</legend>
                {show && <div>{children}</div>}
            </fieldset>
        );
    }
}
