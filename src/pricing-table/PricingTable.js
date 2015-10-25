import React from 'react';
import PricingTableRow from './PricingTableRow';

export default () => {
    const times = [{}, {}, {}];

	return (
		<table>
			<thead>
				<tr>
					<th>Expiry</th>
					<th>95%<br/>87.354</th>
					<th>96%<br/>88.274</th>
                    <th>97%<br/>89.193</th>
                    <th>98%<br/>90.113</th>
					<th>99%<br/>91.032</th>
					<th>100%<br/>91.952</th>
				</tr>
			</thead>
			<tbody>
                {times.map((t, i) => <PricingTableRow key={i} time={t} />)}
			</tbody>
		</table>
	);
};
