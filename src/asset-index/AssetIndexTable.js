import React, { PropTypes } from 'react';
import AssetIndexRow from './AssetIndexRow';

const AssetIndexTable = ({ submarket, index }) => (
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
                {Array(8 - index[0][2].length).map(id => <th key={id}></th>)}
            </tr>}
        </thead>
        <tbody>
            {index.map(idx =>
                <AssetIndexRow
                    key={idx}
                    assetIndex={idx} />)}
        </tbody>
    </table>
);

AssetIndexTable.propTypes = {
    submarket: PropTypes.string.isRequired,
    index: PropTypes.array.isRequired,
};

export default AssetIndexTable;
