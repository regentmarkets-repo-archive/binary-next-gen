import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import AssetIndexRow from './AssetIndexRow';

const indexTypeExtraction = (index) => fromJS(index
    .map((symbols) => symbols[2].map((type) => type[1]))
    .reduce((prv, curr) => prv.concat(curr)))
    .toOrderedSet();

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
                { indexTypeExtraction(index)
                    .map((typeName, k) => <th key={k}>{typeName}</th>)
                }
            </tr>}
        </thead>
        <tbody>
            {index.map(idx =>
                <AssetIndexRow
                    key={idx}
                    assetIndex={idx}
                    header={indexTypeExtraction(index).toJS()}
                />
            )}
        </tbody>
    </table>
);

AssetIndexTable.propTypes = {
    submarket: PropTypes.string.isRequired,
    index: PropTypes.array.isRequired,
};

export default AssetIndexTable;
