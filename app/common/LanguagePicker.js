import React from 'react';
import SelectGroup from '../common/SelectGroup';

const languages = [{
    value: 'ZH_TW',
    text: '繁體中文',
}, {
    value: 'DE',
    text: 'Deutsch',
}, {
    value: 'ID',
    text: 'Bahasa Indonesia',
}, {
    value: 'ZH_CN',
    text: '简体中文',
}, {
    value: 'IT',
    text: 'Italiano',
}, {
    value: 'VI',
    text: 'Vietnamese',
}, {
    value: 'AR',
    text: 'Arabic',
}, {
    value: 'PL',
    text: 'Polish',
}, {
    value: 'RU',
    text: 'Русский',
}, {
    value: 'PT',
    text: 'Português',
}, {
    value: 'ES',
    text: 'Español',
}, {
    value: 'FR',
    text: 'Français',
}, {
    value: 'EN',
    text: 'English',
}];

export default () => (
    <SelectGroup items={languages} />
);
