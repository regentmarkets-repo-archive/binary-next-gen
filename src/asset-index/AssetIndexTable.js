import React, { PropTypes } from 'react';
import AssetIndexRow from './AssetIndexRow';
import { indexTypeExtraction } from '../_selectors/AssetIndexSelectors';

export default class AssetIndexTable extends React.Component {

    static propTypes = {
        index: PropTypes.array.isRequired,
    };

    render() {
        const { index } = this.props;

        return (
            <table>
                <thead>
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
