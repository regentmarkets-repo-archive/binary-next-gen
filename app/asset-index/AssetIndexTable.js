import React from 'react';
import AssetIndexRow from './AssetIndexRow';

const AssetIndexTable = (props) => (
    <table>
        <thead>
            <tr>
                <th colSpan="100">
                    {props.submarket.submarket}
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
            {submarket.available.map((a, i) => <AssetIndexRow key={i} symbol={a.symbol_display} />)}
        </tbody>
    </table>
);

AssetIndexTable.propTypes = {
    submarket: React.PropTypes.object.isRequired,
};

export default AssetIndexTable;
