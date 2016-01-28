import React, { PropTypes } from 'react';

export default class AssetIndexRow extends React.Component {

    static propTypes = {
        assetName: PropTypes.string.isRequired,
        times: PropTypes.array.isRequired,
    };

    render() {
        const { assetName, times } = this.props;

        return (
            <tr>
                <td>
                    {assetName}
                </td>
                {times.map((time, k) =>
                    <td key={k}>
                            {time}
                    </td>
                )}
            </tr>
        );
    }
}
