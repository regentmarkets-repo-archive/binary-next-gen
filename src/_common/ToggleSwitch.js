import React, { Component, PropTypes } from 'react';

export default class ToggleSwitch extends Component {

    static propTypes = {
        checked: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string,
    };

    static defaultProps = {
        checked: false,
    };

    render() {
        const { checked, onClick } = this.props;
        return (
            <div className="row-spacer"> 
                <div className="onoffswitch">
                    <input 
                        type="checkbox" 
                        name="onoffswitch" 
                        className="onoffswitch-checkbox" 
                        id="myonoffswitch" 
                        checked={checked}
                        onClick={onClick}
                    />
                    <label htmlFor="myonoffswitch" className="onoffswitch-label">  
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                    </label> 
                </div>
            </div> 
        );
    }
}
