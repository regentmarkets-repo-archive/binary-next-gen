import React, { Component, PropTypes } from 'react';

export default class StartLaterToggleSwitch extends Component {

    static propTypes = {
        checked: PropTypes.bool,
        id: PropTypes.any.isRequired,
        onClick: PropTypes.func,
        text: PropTypes.string,
    };

    static defaultProps = {
        checked: false,
    };

    render() {
        const { checked, id, onClick } = this.props;
        const className = checked ? 'onoffswitch-checkbox checked' : 'onoffswitch-checkbox';
        return (
            <div className="row-spacer">
                <div className="onoffswitch">
                    <button
                        name="onoffswitch"
                        className={className}
                        id={'toggle-' + id}
                        onClick={onClick}
                    />
                    <label htmlFor={'toggle-' + id} className="onoffswitch-label">
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                    </label>
                </div>
            </div>
        );
    }
}
