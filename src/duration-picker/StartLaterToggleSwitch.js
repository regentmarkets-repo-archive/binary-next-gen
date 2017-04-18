import React, { PureComponent } from 'react';

export default class StartLaterToggleSwitch extends PureComponent {
    props: {
        checked: boolean,
        id: any,
        onClick: (e: SyntheticEvent) => void,
        text: string,
    };

    static defaultProps = {
        checked: false,
    };

    render() {
        const { checked, id, onClick } = this.props;
        const className = checked
            ? 'onoffswitch-checkbox checked'
            : 'onoffswitch-checkbox';
        return (
            <div className="onoffswitch">
                <button
                    name="onoffswitch"
                    className={className}
                    id={'toggle-' + id}
                    onClick={onClick}
                />
                <label htmlFor={'toggle-' + id} className="onoffswitch-label">
                    <span className="onoffswitch-inner" />
                    <span className="onoffswitch-switch" />
                </label>
            </div>
        );
    }
}
