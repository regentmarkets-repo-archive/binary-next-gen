import React, { PropTypes } from 'react';
import AssetIndexRow from './AssetIndexRow';
import { indexTypeExtraction } from '../_selectors/AssetIndexSelectors';

export default class AssetIndexTable extends React.Component {

    static propTypes = {
        submarketName: PropTypes.string.isRequired,
        index: PropTypes.array.isRequired,
    };

    render() {
        const { submarketName, index } = this.props;

        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan="100">
                        {submarketName}
                        </th>
                    </tr>
                    {index[0] &&
                    <tr>
                        <th></th>
                        {index.map((typeName, key) =>
                            <th key={key}>{typeName}</th>
                        )}
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
    }
}
