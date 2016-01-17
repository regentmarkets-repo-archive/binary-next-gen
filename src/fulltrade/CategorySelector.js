import React, { Component, PropTypes } from 'react';
import SelectGroup from '../_common/SelectGroup';

export default class CategorySelector extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired,
        selected: PropTypes.string,
        onChange: PropTypes.func,
    };

    render() {
        const { categories, selected, onChange } = this.props;
        return (
            <SelectGroup options={categories} value={selected} onChange={onChange} />
        );
    }
}

