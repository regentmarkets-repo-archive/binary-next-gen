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

const hasBasic = contract =>
    Object.keys(contract).find(c => tradeGrouping[0].includes(c));

const hasDigits = contract =>
    Object.keys(contract).find(c => tradeGrouping[1].includes(c));

const hasAdvanced = contract =>
    Object.keys(contract).find(c => tradeGrouping[2].includes(c));

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

const pairUpTypes = types => {
    const paired = [];
    types.forEach((t, idx) => {
        if (idx % 2 === 0) {
            paired.push([t, types[idx + 1]]);
        }
    });
    return paired;
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
        const { contract, onTypeChange } = this.props;
        const selectedCategory = findCategoryForType(contract, type);
        onTypeChange(internalToServerTradeType(type), selectedCategory);
    }

    render() {
        const { contract, selectedCategory, selectedType } = this.props;
        const { tradeGroup } = this.state;
        // type come in pairs logically
        const types = typesForCategories(contract, tradeGrouping[tradeGroup])
            .map(type => ({ text: tradeTypeCodeToText(type), value: type }));
        const internalSelectedType = serverToInternalTradeType(selectedCategory, selectedType);
        const typePairs = pairUpTypes(types);
        return (
            <div id="trade-type-picker">
                <TabList activeIndex={tradeGroup} onChange={::this.changeGroup}>
                    {hasBasic(contract) && <Tab text="Basic" />}
                    {hasDigits(contract) && <Tab text="Digits" />}
                    {hasAdvanced(contract) && <Tab text="Advanced" />}
                </TabList>
                <div id="type-pairs">
                    {typePairs.map(x =>
                        <div className="type-pair">
                            <Tab
                                key={x[0].text}
                                text={x[0].text}
                                imgSrc={`img/trade-${x[0].value.toLowerCase()}.svg`}
                                selected={internalSelectedType === x[0].value}
                                onClick={() => this.changeType(x[0].value)}
                            />
                            <Tab
                                key={x[1].text}
                                text={x[1].text}
                                imgSrc={`img/trade-${x[1].value.toLowerCase()}.svg`}
                                selected={internalSelectedType === x[1].value}
                                onClick={() => this.changeType(x[1].value)}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
