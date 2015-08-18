import React from 'react';

export default class AssetIndexRow {

    static propTypes = {
		symbol: React.PropTypes.string.isRequired,
	};

    render() {
        const { symbol } = this.props;

        return (
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
    }
}
