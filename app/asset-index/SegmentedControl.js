import React from 'react';

export default class SegmentedControl extends React.Component {

    render() {
        return (
            <ul role="segmented">
                <li class="active">
                    <a href="#asset-forex">Forex</a>
                </li>
                <li>
                    <a href="#asset-indices">Indices</a>
                </li>
                <li>
                    <a href="#asset-stocks">Stocks</a>
                </li>
                <li>
                    <a href="#asset-commodities">Commodities</a>
                </li>
                <li>
                    <a href="#asset-random">Randoms</a>
                </li>
            </ul>
        );
    }
}
