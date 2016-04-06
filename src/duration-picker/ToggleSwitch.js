import React, { Component, PropTypes } from 'react';

export default class ToggleSwitch extends Component {

    static propTypes = {
        id: PropTypes.any.isRequired,
        checked: PropTypes.bool,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        checked: false,
    };

    render() {
        const { id, checked, onClick } = this.props;
        const className = checked ? 'onoffswitch-checkbox checked' : 'onoffswitch-checkbox';
        return (
            <div className="row-spacer"> 
                <div className="onoffswitch">
                    <input 
                        type="text"
                        name="onoffswitch" 
                        className={className}
                        id={id}
                        checked={checked}
                        onClick={onClick}
                    />
                    <label htmlFor={id} className="onoffswitch-label">
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                    </label> 
                </div>
            </div> 
        );
    }
}
