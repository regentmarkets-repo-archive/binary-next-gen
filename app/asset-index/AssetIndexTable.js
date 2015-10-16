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
            {index[0] &&
            <tr>
                <th></th>
                { index[0][2].map((idx) => <th key={idx}>{idx[1]}</th>)}
                {Array(8 - index[0][2].length).fill(<th></th>)}
            </tr>}
        </thead>
        <tbody>
            {index.map(idx => <AssetIndexRow key={idx[0]} assetIndex={idx} />)}
        </tbody>
    </table>
);

AssetIndexTable.propTypes = {
    submarket: React.PropTypes.string.isRequired,
    index: React.PropTypes.array.isRequired,
};

export default AssetIndexTable;
