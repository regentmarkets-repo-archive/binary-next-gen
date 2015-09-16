import React from 'react';

const markets = [
    {
        name: 'Forex',
        submarkets: [
            {
                id: 'frxAUDJPY',
                name: 'AUD/JPY',
            },
            {
                id: 'frxAUDUSD',
                name: 'AUD/USD',
            },
            {
                id: 'frxEURAUD',
                name: 'EUR/AUD',
            },
            {
                id: 'frxEURCAD',
                name: 'EUR/CAD',
            },
            {
                id: 'frxEURGBP',
                name: 'EUR/GBP',
            },
            {
                id: 'frxEURJPY',
                name: 'EUR/JPY',
            },
            {
                id: 'frxEURUSD',
                name: 'EUR/USD',
            },
            {
                id: 'frxGBPAUD',
                name: 'GBP/AUD',
            },
            {
                id: 'frxGBPCAD',
                name: 'GBP/CAD',
            },
            {
                id: 'frxGBPJPY',
                name: 'GBP/JPY',
            },
            {
                id: 'frxGBPUSD',
                name: 'GBP/USD',
            },
            {
                id: 'frxNZDUSD',
                name: 'NZD/USD',
            },
            {
                id: 'frxUSDCAD',
                name: 'USD/CAD',
            },
            {
                id: 'frxUSDJPY',
                name: 'USD/JPY',
            },
        ],
    },
    {
        name: 'Indices',
        submarkets: [
            {
                id: 'AS51',
                name: 'Australian Index',
            },
            {
                id: 'AEX',
                name: 'Dutch Index',
            },
            {
                id: 'SX5E',
                name: 'Euro 50 Index',
            },
            {
                id: 'FCHI',
                name: 'French Index',
            },
            {
                id: 'GDAXI',
                name: 'German Index',
            },
            {
                id: 'HSI',
                name: 'Hong Kong Index',
            },
            {
                id: 'N225',
                name: 'Japanese Index',
            },
            {
                id: 'SSMI',
                name: 'Swiss Index',
            },
            {
                id: 'SPC',
                name: 'US Index',
            },
            {
                id: 'DJI',
                name: 'Wall Street Index',
            },
        ],
    },
    {
        name: 'Commodities',
        submarkets: [
            {
                id: 'frxXAUUSD',
                name: 'Gold/USD',
            },
            {
                id: 'frxXAGUSD',
                name: 'Silver/USD',
            },
        ],
    },
    {
        name: 'Randoms',
        submarkets: [
            {
                id: 'R_100',
                name: 'Random 100 Index',
            },
            {
                id: 'R_25',
                name: 'Random 25 Index',
            },
            {
                id: 'R_50',
                name: 'Random 50 Index',
            },
            {
                id: 'R_75',
                name: 'Random 75 Index',
            },
            {
                id: 'RDBEAR',
                name: 'Random Bear',
            },
            {
                id: 'RDBULL',
                name: 'Random Bull',
            },
            {
                id: 'RDMARS',
                name: 'Random Mars',
            },
            {
                id: 'RDMOON',
                name: 'Random Moon',
            },
            {
                id: 'RDSUN',
                name: 'Random Sun',
            },
            {
                id: 'RDVENUS',
                name: 'Random Venus',
            },
            {
                id: 'RDYANG',
                name: 'Random Yang',
            },
            {
                id: 'RDYIN',
                name: 'Random Yin',
            },
        ],
    },
];

export default () => (
    <select {...this.props}>
        { markets.map(market =>
            <optgroup label={market.name}>
                {market.submarkets.map(subm =>
                    <option value={subm.id}>{subm.name}</option>
                )}
            </optgroup>
        )}
    </select>
);
