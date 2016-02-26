import React, { PropTypes, Component } from 'react';

export default class JpTradeCard extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Excercise price</th>
                        <th>Higher</th>
                        <th>Lower</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(new Array(10)).map(() =>
                        <tr>
                            <td>81.777</td>
                            <td>
                                1,000<button className="btn-secondary">Buy</button>
                                &nbsp;20 <button className="btn-secondary">Sell</button>
                            </td>
                            <td>
                                1,000<button className="btn-secondary">Buy</button>
                                &nbsp;20 <button className="btn-secondary">Sell</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
