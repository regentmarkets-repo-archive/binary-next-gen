import React from 'react';
import AssetIndexRow from './AssetIndexRow';

export default class AssetIndexTable {

    render() {

        const assets = [{}, {}, {}];

        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan="100">
                            Major Pairs
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Up/<wbr/>Down</th>
                        <th>Touch/<wbr/>No Touch</th>
                        <th>Ends Between/<wbr/>Outside</th>
                        <th>Stays Between/<wbr/>Goes Outside</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((a, i) => <AssetIndexRow key={i} asset={a} />)}
                </tbody>
            </table>
        );
    }
}
