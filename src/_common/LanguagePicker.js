import React from 'react';
import { SelectGroup } from '../_common';
import languages from '../_constants/languages';

const LanguagePicker = ({onChange, current}) => (
    <SelectGroup options={languages} value={current} onChange={onChange} />
);

LanguagePicker.propTypes = {
    current: React.PropTypes.oneOf(languages.map(ln => ln.value)),
};

LanguagePicker.defaultProps = {
    current: 'EN',
};

export default LanguagePicker;
