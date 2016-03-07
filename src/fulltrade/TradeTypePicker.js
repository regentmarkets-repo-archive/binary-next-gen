import React, { Component, PropTypes } from 'react';
import SelectGroup from '../_common/SelectGroup';
import TabList from '../_common/TabList';
import Tab from '../_common/Tab';
import RadioGroup from './workaround/CustomRadioGroup';
import { contractCategoryDisplay } from '../_utils/TradeUtils';
import { tradeTypeCodeToText } from '../_utils/TradeUtils';

export default class TradeTypePicker extends Component {

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
        console.log('ready to pre');
        const categories = Object
            .keys(contract)
            .map(c => ({ value: c, text: contractCategoryDisplay(c) }));
        const selectedCategoryIndex = categories.indexOf(selectedCategory);
        const types = Object
            .keys(contract[selectedCategory])
            .map(type => ({ text: tradeTypeCodeToText(type), value: type }));
        const index = (Math.random() * 1000 * 1000).toFixed();
        console.log('ready to render');
        return (
            <div>
                <TabList
                    activeIndex={selectedCategoryIndex}
                    onChange={onCategoryChange}
                >
                    {categories.map(x =>
                        <Tab text={x.text} />
                    )}
                </TabList>
                <TabList onChange={onTypeChange}>
                    {types.map(x =>
                        <Tab text={x.text} />
                    )}
                </TabList>
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
            </div>
        );
    }
}
