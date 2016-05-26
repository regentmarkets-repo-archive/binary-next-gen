import React, { Component, PropTypes } from 'react';
import TabList from '../_common/TabList';
import Tab from '../_common/Tab';
import contractCategoryToText from 'binary-utils/lib/contractCategoryToText';
import tradeTypeCodeToText from 'binary-utils/lib/tradeTypeCodeToText';
import { serverToInternalTradeType, internalToServerTradeType } from './TradeTypeAdapter';
import {
    tradeGrouping,
    typesForCategories,
    hasAdvanced,
    hasBasic,
    hasDigits,
    findCategoryForType,
    pairUpTypes,
} from './TradeTypePickerUtils';
import { changeCategory, changeType } from '../trade-params/TradeParamsCascadingUpdates';

export default class TradeTypePicker extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        contract: PropTypes.object.isRequired,
        onSelect: PropTypes.func,
        tradeParams: PropTypes.object.isRequired,
        updateParams: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { tradeGroup: 0 };
    }

    componentWillMount() {
        const { tradeParams } = this.props;
        const selectedCategory = tradeParams.tradeCategory;
        const groupId = tradeGrouping.findIndex(categories => categories.includes(selectedCategory));
        this.setState({ tradeGroup: groupId });
    }

    changeGroup(id) {
        this.onGroupChange(id);
        this.setState({ tradeGroup: id });
    }

    onGroupChange(group) {
        const { contract, tradeParams, updateParams } = this.props;
        const selectedCategory = tradeParams.tradeCategory;
        const groupCategories = Object
            .keys(contract)
            .map(c => ({ value: c, text: contractCategoryToText(c) }))
            .filter(c => tradeGrouping[group].includes(c.value));

        if (!groupCategories.find(c => c.value === selectedCategory)) {
            const updatedCategory = changeCategory(groupCategories[0].value, contract);
            updateParams(updatedCategory);
        }
    }

    changeType(type) {
        const { contract, onSelect, tradeParams, updateParams } = this.props;
        const selectedCategory = findCategoryForType(contract, type);
        const updatedType = changeType(internalToServerTradeType(type), selectedCategory, tradeParams, contract);
        updateParams(updatedType);
        if (onSelect) {
            onSelect(updatedType);
        }
    }

    render() {
        const { contract, tradeParams } = this.props;
        const selectedCategory = tradeParams.tradeCategory;
        const selectedType = tradeParams.type;
        const { tradeGroup } = this.state;
        // type come in pairs logically
        const types = typesForCategories(contract, tradeGrouping[tradeGroup])
            .map(type => ({ text: tradeTypeCodeToText(type), value: type }));
        const internalSelectedType = serverToInternalTradeType(selectedCategory, selectedType);
        const typePairs = pairUpTypes(types);
        return (
            <div className="trade-type-picker">
                <TabList activeIndex={tradeGroup} onChange={::this.changeGroup}>
                    {hasBasic(contract) && <Tab text="Basic" />}
                    {hasDigits(contract) && <Tab text="Digits" />}
                    {hasAdvanced(contract) && <Tab text="Advanced" />}
                </TabList>
                <div id="type-pairs">
                    {typePairs.map(x =>
                        <div className="type-pair" key={x[0].value}>
                            <Tab
                                text={x[0].text}
                                imgSrc={`img/trade-${x[0].value.toLowerCase()}.svg`}
                                selected={internalSelectedType === x[0].value}
                                onClick={() => this.changeType(x[0].value)}
                            />
                            <Tab
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
