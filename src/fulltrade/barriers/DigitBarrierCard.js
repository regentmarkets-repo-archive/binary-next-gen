import React, { PropTypes, Component } from 'react';
import RadioGroup from './../workaround/CustomRadioGroup';
import CollapsibleFormSnippet from '../../containers/CollapsibleFormSnippet';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class DigitBarrierCard extends Component {
    static propTypes = {
        barrier: PropTypes.number,
        barrierInfo: PropTypes.object,
        id: PropTypes.string,
        onBarrierChange: PropTypes.func,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { barrier, barrierInfo, id, onBarrierChange } = this.props;
        return (
            <CollapsibleFormSnippet label="Digits">
                {barrierInfo ?
                    <div>
                        <p>{barrierInfo.name}</p>
                        <RadioGroup
                            name={'digit-selections' + id}
                            options={barrierInfo.values.map(b => ({ text: b, value: b }))}
                            value={barrier}
                            onChange={onBarrierChange}
                        />
                    </div> :
                    <div/>}
            </CollapsibleFormSnippet>
        );
    }
}
