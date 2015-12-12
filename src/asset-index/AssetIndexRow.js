import React, { PropTypes } from 'react';

const AssetIndexRow = ({ assetIndex }) => (
    <tr>
        <td>
            {assetIndex[1]}
        </td>
        {assetIndex[2].map(idx =>
            <td key={idx}>{idx[2]}–{idx[3]}</td>
        )}
        {Array(8 - assetIndex[2].length).map(id => <td key={id}></td>)}
    </tr>
);

AssetIndexRow.propTypes = {
    assetIndex: PropTypes.array.isRequired,
};

export default AssetIndexRow;
