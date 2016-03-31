import React, { PropTypes, Component } from 'react';
import Button from '../_common/Button';

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
                    {Array.from(new Array(10)).map((x, idx) =>
                        <tr key={idx}>
                            <td>81.777</td>
                            <td>
                                1,000<Button className="btn-secondary" text="Buy" />
                                &nbsp;20 <Button className="btn-secondary" text="Sell" />
                            </td>
                            <td>
                                1,000<Button className="btn-secondary" text="Buy" />
                                &nbsp;20 <Button className="btn-secondary" text="Sell" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
