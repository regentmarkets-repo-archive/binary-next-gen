import React, { Component, PropTypes } from 'react';
import SelectGroup from '../_common/SelectGroup';

export default class FullTradeCategorySelector extends Component {
    static propTypes = {
        allCategories: PropTypes.array.isRequired,
        selected: PropTypes.string,
        onCategoryChange: PropTypes.func,
    };

    render() {
        const { allCategories, selected, onCategoryChange } = this.props;
        return (
            <SelectGroup options={allCategories} value={selected} onChange={e => onCategoryChange(e.target.value)} />
        );
    }
}
