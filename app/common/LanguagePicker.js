import React from 'react';
import { SelectGroup } from '../common';
import languages from '../_constants/languages';

export default () => (
    <SelectGroup options={languages} value="EN" />
);
