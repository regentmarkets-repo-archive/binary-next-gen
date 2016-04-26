import React, { Component, PropTypes } from 'react';
import TabList from '../_common/TabList';
import Tab from '../_common/Tab';
import contractCategoryDisplay from 'binary-utils/lib/contractCategoryDisplay';
import tradeTypeCodeToText from 'binary-utils/lib/tradeTypeCodeToText';
import { serverToInternalTradeType, internalToServerTradeType } from './TradeTypeAdapter';

const tradeGrouping = [
    ['risefall', 'higherlower', 'endsinout', 'staysinout', 'touchnotouch'],
    ['digits'],
    ['spreads', 'asian'],
];

const hasBasic = contract => {
    const idx = Object.keys(contract).findIndex(c => tradeGrouping[0].includes(c));
    return idx !== -1;
};

const hasDigits = contract => {
    const idx = Object.keys(contract).findIndex(c => tradeGrouping[1].includes(c));
    return idx !== -1;
};

const hasAdvanced = contract => {
    const idx = Object.keys(contract).findIndex(c => tradeGrouping[2].includes(c));
    return idx !== -1;
};

const typesForCategory = (contract, category) =>
    Object.keys(contract[category]).map(type => serverToInternalTradeType(category, type));

const typesForCategories = (contract, categories) =>
    categories.reduce((a, b) => a.concat(typesForCategory(contract, b)), []);

const findCategoryForType = (contract, type) => {
    switch (type) {
        case 'CALL': return 'risefall';
        case 'PUT': return 'risefall';
        case 'HIGHER': return 'higherlower';
        case 'LOWER': return 'higherlower';
        default: return Object.keys(contract).find(cat => Object.keys(contract[cat]).includes(type));
    }
};

export default class TradeTypePicker extends Component {
    constructor(props) {
        super(props);
        this.state = { tradeGroup: 0 };
    }

    componentWillMount() {
        const { selectedCategory } = this.props;
        const groupId = tradeGrouping.findIndex(categories => categories.includes(selectedCategory));
        this.setState({ tradeGroup: groupId });
    }

    static propTypes = {
        actions: PropTypes.object.isRequired,
        contract: PropTypes.object.isRequired,
        selectedCategory: PropTypes.string.isRequired,
        selectedType: PropTypes.string.isRequired,
        onTypeChange: PropTypes.func.isRequired,
        onCategoryChange: PropTypes.func.isRequired,
    };

    changeGroup(id) {
        this.onGroupChange(id);
        this.setState({ tradeGroup: id });
    }

    onGroupChange(group) {
        const { contract, selectedCategory, onCategoryChange } = this.props;
        const groupCategories = Object
            .keys(contract)
            .map(c => ({ value: c, text: contractCategoryDisplay(c) }))
            .filter(c => tradeGrouping[group].includes(c.value));

        if (!groupCategories.find(c => c.value === selectedCategory)) {
            onCategoryChange(groupCategories[0].value);
        }
    }

    changeType(type) {
        const { contract, onCategoryChange, onTypeChange } = this.props;
        const selectedCategory = findCategoryForType(contract, type);
        onCategoryChange(selectedCategory);
        onTypeChange(internalToServerTradeType(type));
    }

    render() {
        const { contract, selectedCategory, selectedType } = this.props;
        const { tradeGroup } = this.state;
        const types = typesForCategories(contract, tradeGrouping[tradeGroup])
            .map(type => ({ text: type, value: type }));
        const internalSelectedType = serverToInternalTradeType(selectedCategory, selectedType);
        const selectedTypeIndex = types.findIndex(x => x.value === internalSelectedType);

        return (
            <div className="trade-type-picker">
                <TabList activeIndex={tradeGroup} onChange={::this.changeGroup}>
                    {hasBasic(contract) && <Tab text="Basic" />}
                    {hasDigits(contract) && <Tab text="Digits" />}
                    {hasAdvanced(contract) && <Tab text="Advanced" />}
                </TabList>
                <TabList
                    id="type-picker"
                    activeIndex={selectedTypeIndex}
                    onChange={idx => this.changeType(types[idx].value)}
                >
                    {types.map((x, idx) =>
                        <Tab key={idx} text={x.text} imgSrc={`img/trade-${x.value.toLowerCase()}.svg`} />
                    )}
                </TabList>
            </div>
        );
    }
}
