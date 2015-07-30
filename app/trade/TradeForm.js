import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import { marketStructure } from '../asset-index/MarketStructure';

export default class TradeForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = { };
	}

	render() {

		return (
			<div>
				<SegmentedControl
					segments={marketStructure.map(m => m.name)}
					onSelect={this.onAssetSelect} />

				<SegmentedControl
					segments={['Up/Down', 'Rise/Fall', 'Higher/Lower', 'Touch/No Touch', 'In/Out']} />

				<select>
					<option value="all">All</option>
					<option value="asia_oceania">Asia/Oceania</option>
					<option value="europe_africa">Europe/Africa</option>
					<option value="americas">Americas</option>
				</select>

				<select>
					<option class="asia_oceania" value="AS51">Australian Index</option>
					<option class="europe_africa" value="AEX" >Dutch Index</option>
					<option class="europe_africa" value="SX5E">Euro 50 Index</option>
					<option class="europe_africa" value="FCHI">French Index</option>
					<option class="europe_africa" value="GDAXI">German Index</option>
					<option class="asia_oceania" value="HSI">Hong Kong Index</option>
					<option class="asia_oceania" value="N225">Japanese Index</option>
					<option class="europe_africa" value="SSMI">Swiss Index</option>
					<option class="americas" value="SPC">US Index</option>
					<option class="americas" value="DJI">Wall Street Index</option>
				</select>
				<br />
				<select>
					<option value="duration">Duration</option>
					<option value="endtime">End Time</option>
				</select>
				<input type="date" name="duration_amount" value="10" />
				<select>
					<option class="spot" value="d">days</option>
				</select>
				<br />
				<span>Spot: 123</span>
				<br />
				<label>Barrier</label>
				<input type="number" value="506.00" />
				<br />
				<select>
					<option value="payout">Payout</option>
					<option value="stake">Stake</option>
				</select>
				<select>
					<option value="USD" selected="selected">USD</option>
				</select>
				<input type="number" value="100" />
			</div>
		);
	}
}
