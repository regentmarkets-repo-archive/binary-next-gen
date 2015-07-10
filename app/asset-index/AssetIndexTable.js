import React from 'react';

export default class AssetIndexRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    AUD/JPY
                </td>
                <td>
                    <a href="#">
                        5t–365d
                    </a>
                </td>
                <td>
                    <a href="#">
                        1h–365d
                    </a>
                </td>
                <td>
                    <a href="#">
                        1d–365d
                    </a>
                </td>
                <td>
                    <a href="#">
                        1d–365d
                    </a>
                </td>
            </tr>
        );
    }
}


export default class AssetIndexTable extends React.Component {


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
