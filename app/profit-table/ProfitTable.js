import React from 'react';
import { NumberColored } from '../common';
import { dateStr } from '../common/DateUtils';
import ProfitRow from './ProfitRow';

const calulateTotals = profits => profits.map(p => +p.salePrice).reduce((x, y) => x + y, 0);

const ProfitTable = ({profits, onViewDetails}) => (
	<table>
		<thead>
			<tr>
                <th>Purchase Date</th>
				<th>Ref.</th>
				<th>Contract</th>
				<th>Purchase Price</th>
                <th>Sale Date</th>
                <th>Sale Price</th>
                <th>Profit/Loss</th>
                <th></th>
			</tr>
		</thead>
		<tbody>
            {profits.map(p => <ProfitRow key={p.ref} profit={p} onViewDetails={onViewDetails} />)}
		</tbody>
		<thead>
			<tr>
				<th>{profits[0] && `${dateStr(profits[0].date)} - ${dateStr(profits[profits.length - 1].date)}`}</th>
				<th colSpan={4}></th>
				<th>Total Profit/Loss</th>
                <th><NumberColored value={calulateTotals(profits)} /></th>
                <th></th>
			</tr>
		</thead>
	</table>
);

ProfitTable.propTypes = {
	profits: React.PropTypes.array.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default ProfitTable;
