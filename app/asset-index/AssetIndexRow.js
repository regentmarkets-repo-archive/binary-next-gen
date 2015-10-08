import React from 'react';

const AssetIndexRow = ({symbol}) => (
    <tr>
        <td>
            {symbol}
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

AssetIndexRow.propTypes = {
    symbol: React.PropTypes.string.isRequired,
};

export default AssetIndexRow;
