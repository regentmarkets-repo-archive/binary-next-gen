import React from 'react';
import { Direction, NumberColored } from '../_common';
import M from '../_common/M';

export default () => (
	<table>
		<thead>
			<tr>
				<th><M m="Date" /></th>
				<th><M m="Open" /></th>
				<th><M m="High" /></th>
				<th><M m="Low" /></th>
				<th><M m="Close" /></th>
				<th><M m="Change" /></th>
				<th><M m="Rel Change" /></th>
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
				<th colSpan="7"><M m="Summary" /></th>
			</tr>
			<tr>
				<th><M m="Statistic" /></th>
				<th><M m="Open" /></th>
				<th><M m="High" /></th>
				<th><M m="Low" /></th>
				<th><M m="Close" /></th>
				<th><M m="Average Change" /></th>
				<th><M m="Rel Change" /></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><M m="Maximum" /></td>
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
