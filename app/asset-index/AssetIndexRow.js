import React from 'react';

const AssetIndexRow = ({asset}) => (
    <tr>
        <td>
            {asset.display_name}
        </td>
        <td>
            5t–365d
        </td>
        <td>
            1h–365d
        </td>
        <td>
            1d–365d
        </td>
        <td>
            1d–365d
        </td>
    </tr>
);

AssetIndexRow.propTypes = {
    asset: React.PropTypes.object.isRequired,
};

export default AssetIndexRow;
