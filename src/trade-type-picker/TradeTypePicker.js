import React, { Component, PropTypes } from 'react';
import TabList from '../_common/TabList';
import Tab from '../_common/Tab';
import contractCategoryDisplay from 'binary-utils/lib/contractCategoryDisplay';
import tradeTypeCodeToText from 'binary-utils/lib/tradeTypeCodeToText';

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
        const categories = Object
            .keys(contract)
            .map(c => ({ value: c, text: contractCategoryDisplay(c) }));
        const selectedCategoryIndex = categories.findIndex(x => x.value === selectedCategory);
        const types = Object
            .keys(contract[selectedCategory])
            .map(type => ({ text: tradeTypeCodeToText(type), value: type }));
        const selectedTypeIndex = types.findIndex(x => x.value === selectedType);

        return (
            <div className="trade-type-picker">
                <TabList>
                    <Tab text="Basic" />
                    <Tab text="Digits" />
                    <Tab text="Advanced" />
                </TabList>
                <TabList
                    id="type-category-picker"
                    activeIndex={selectedCategoryIndex}
                    onChange={idx => onCategoryChange(categories[idx].value)}
                >
                    {categories.map((x, idx) =>
                        <Tab key={idx} text={x.text} />
                    )}
                </TabList>
                <TabList
                    id="type-picker"
                    activeIndex={selectedTypeIndex}
                    onChange={idx => onTypeChange(types[idx].value)}
                >
                    {types.map((x, idx) =>
                        <Tab key={idx} text={x.text} imgSrc={`img/trade-${x.value.toLowerCase()}.svg`} />
                    )}
                </TabList>
            </div>
        );
    }
}
