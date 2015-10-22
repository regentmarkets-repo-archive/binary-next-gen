import React from 'react';
import { Direction, NumberColored } from '../_common';

export default () => (
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Open</th>
				<th>High</th>
				<th>Low</th>
				<th>Close</th>
				<th>Change</th>
				<th>Rel Change</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>2015-07-27-1.36%</td>
				<td>168.68</td>
				<td>169.45</td>
				<td>165.90</td>
				<td>166.38</td>
				<td><NumberColored value={-2.30} /></td>
				<td><NumberColored value={-2.30} /><Direction diff={-2.30} /></td>
			</tr>
		</tbody>
		<thead>
			<tr>
				<th colSpan="7">Summary</th>
			</tr>
			<tr>
				<th>Statistic</th>
				<th>Open</th>
				<th>High</th>
				<th>Low</th>
				<th>Close</th>
				<th>Average Change</th>
				<th>Rel Change</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Maximum</td>
				<td>168.68</td>
				<td>169.45</td>
				<td>165.90</td>
				<td>166.38</td>
				<td><NumberColored value={1.20} /></td>
				<td><NumberColored value={1.20} /><Direction diff={1.20} /></td>
			</tr>
		</tbody>
	</table>
);
