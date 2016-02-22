import React, { Component, PropTypes } from 'react';
import SelectGroup from '../_common/SelectGroup';
import RadioGroup from './workaround/CustomRadioGroup';
import { contractCategoryDisplay } from '../_utils/TradeUtils';
import { tradeTypeCodeToText } from '../_utils/TradeUtils';

export default class GenericTradeCard extends Component {


    static propTypes = {
        actions: PropTypes.object.isRequired,
        contract: PropTypes.object.isRequired,
        selectedCategory: PropTypes.string.isRequired,
        selectedType: PropTypes.string.isRequired,
        onTypeChange: PropTypes.func.isRequired,
        onCategoryChange: PropTypes.func.isRequired,
    };

    render() {
        const { contract, selectedCategory, selectedType, onCategoryChange, onTypeChange } = this.props;
        const categories = Object
            .keys(contract)
            .map(c => ({ value: c, text: contractCategoryDisplay(c) }));
        const types = Object
            .keys(contract[selectedCategory])
            .map(type => ({ text: tradeTypeCodeToText(type), value: type }));
        const index = (Math.random() * 1000 * 1000).toFixed();

        return (
            <fieldset>
                <SelectGroup
                    id="categories-select"
                    options={categories}
                    value={selectedCategory}
                    onChange={onCategoryChange}
                />
                <RadioGroup
                    name={'trading-types' + index}
                    options={types}
                    value={selectedType}
                    onChange={onTypeChange}
                />
            </fieldset>
        );
    }
}
