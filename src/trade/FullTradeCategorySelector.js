import React, { Component, PropTypes } from 'react';
import SelectGroup from '../_common/SelectGroup';

export default class FullTradeCategorySelector extends Component {
    static propTypes = {
        allCategories: PropTypes.array.isRequired,
        selectedCategory: PropTypes.string,
        onCategoryChange: PropTypes.func,
    };

    render() {
        const { allCategories, selectedCategory, onCategoryChange } = this.props;
        return (
            <SelectGroup
                options={allCategories}
                value={selectedCategory}
                onChange={e => onCategoryChange(e.target.value)}
            />
        );
    }
}
