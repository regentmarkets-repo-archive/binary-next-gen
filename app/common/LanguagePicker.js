import React from 'react';
import SelectGroup from '../common/SelectGroup';
import languages from '../_constants/languages';

export default () => (
    <SelectGroup items={languages} value="EN" />
);
