import React from 'react';
import AssetIndexRow from './AssetIndexRow';

const AssetIndexTable = ({submarket, index}) => (
    <table>
        <thead>
            <tr>
                <th colSpan="100">
                    {submarket}
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
            {index.map(a => <AssetIndexRow key={a.symbol} asset={a} />)}
        </tbody>
    </table>
);

AssetIndexTable.propTypes = {
    submarket: React.PropTypes.string.isRequired,
    index: React.PropTypes.array.isRequired,
};

export default AssetIndexTable;
