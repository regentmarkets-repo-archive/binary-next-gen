import React, { PropTypes } from 'react';

const AssetIndexRow = ({ assetIndex, header }) => (
    <tr>
        <td>
            {assetIndex[1]}
        </td>
        {header.map((typeName, k) => {
            const typeInfo = assetIndex[2].filter((type) => type[1] === typeName)[0];
            return (
                <td key={k}>
                    {typeInfo ? typeInfo[2] + '-' + typeInfo[3] : '-'}
                </td>
                );
        })}
    </tr>
);

AssetIndexRow.propTypes = {
    assetIndex: PropTypes.array.isRequired,
};

export default AssetIndexRow;
