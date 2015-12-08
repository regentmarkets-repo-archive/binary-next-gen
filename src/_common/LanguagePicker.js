import React from 'react';
import { SelectGroup } from '../_common';
import languages from '../_constants/languages';

const LanguagePicker = ({ onChange, selected }) => (
    <SelectGroup options={languages} value={selected} onChange={onChange} />
);

LanguagePicker.propTypes = {
    selected: React.PropTypes.oneOf(languages.map(ln => ln.value)),
    onChange: React.PropTypes.func,
};

LanguagePicker.defaultProps = {
    selected: 'EN',
};

export default LanguagePicker;
