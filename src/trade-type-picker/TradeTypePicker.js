import React, { PureComponent, PropTypes } from 'react';
import { Tab, TabList } from 'binary-components';
import { contractCategoryToText, tradeTypeCodeToText } from 'binary-utils';
import { serverToInternalTradeType, internalToServerTradeType } from './TradeTypeAdapter';
import { tradeGrouping, typesForCategories, hasAdvanced, hasBasic,
    hasDigits, pairUpTypes, findCategoryForType } from './TradeTypePickerUtils';
import { actions } from '../_store';

export default class TradeTypePicker extends PureComponent {

    static propTypes = {
        contract: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        onSelect: PropTypes.func,
        tradeParams: PropTypes.object.isRequired,
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

    onGroupChange(group) {
        const { contract, tradeParams, index } = this.props;
        const selectedCategory = tradeParams.tradeCategory;
        const groupCategories = Object
            .keys(contract)
            .map(c => ({ value: c, text: contractCategoryToText(c) }))
            .filter(c => tradeGrouping[group].includes(c.value));

        if (!groupCategories.find(c => c.value === selectedCategory)) {
            actions.reqCatChange(index, groupCategories[0].value);
        }
    }

    changeGroup = id => {
        this.onGroupChange(id);
        this.setState({ tradeGroup: id });
    }

    changeType(type) {
        const { onSelect, index, contract } = this.props;
        const category = findCategoryForType(contract, type);
        actions.reqTypeChange(index, category, internalToServerTradeType(type));
        if (onSelect) {
            onSelect(type);
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
                <TabList activeIndex={tradeGroup} onChange={this.changeGroup}>
                    {hasBasic(contract) && <Tab text="Basic" />}
                    {hasDigits(contract) && <Tab text="Digits" />}
                    {hasAdvanced(contract) && <Tab text="Advanced" />}
                </TabList>
                <div className="type-pairs-list">
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
