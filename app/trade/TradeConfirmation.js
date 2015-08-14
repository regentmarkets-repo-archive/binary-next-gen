import React from 'react';

export default class TradeConfirmation {

	render() {
		return (
			<div>
	    		<h4>Trade Confirmation</h4>
	    		<p>You have purchased the following contract:</p>
	    		<table>
	            	<tbody>
						<tr>
	                		<th>Entry spot</th><td id="entry"></td>
	                		<th>Exit spot</th><td id="exit"></td>
	            		</tr>
	    			</tbody>
				</table>
			    <div>
			        USD <strong>100.00</strong> payout if Dutch Index <strong>touches 506.00</strong> through close on 2015-08-10.
			    </div>

			    <div>
			        <span>
			            <span>Potential Payout</span>
			            <span>100.00</span>
			        </span>
			        <span>
			            <span>Total Cost</span>
			            <span>44.03</span>
			        </span>
			        <span>
			            <span>Potential Profit</span>
			            <span>55.97</span>
			        </span>
			    </div>
			    <div>
			        <span>
			            <span>Buy Price</span>
			            <span>44.03</span>
			        </span>
			        <span>
			            <span>Final Price</span>
			            <span></span>
			        </span>
			        <span>
			            <span>Profit</span>
			            <span>55.97</span>
			        </span>
			    </div>

		        <span>Your transaction reference number is 8816770508</span>
		        <button>View</button>

				<div id="bom_barrier1"></div>
				<div id="bom_expiry">10.11 days</div>
				<div id="bom_payout">100</div>
				<div id="language">EN</div>
				<div id="pageTitle">Contract Confirmation</div>
				<div id="pjax">false</div>
				<div id="transactionAffiliation">VRTC547953</div>
				<div id="transactionCurrency">USD</div>
				<div id="transactionDate">2015-07-31T12:54:05Z</div>
				<div id="transactionId">8816770508</div>
				<div id="transactionTax">8.94</div>
				<div id="transactionTotal">44.03</div>
				<div id="transactionType">buy</div>
				<div id="event">transaction</div>

        		<div>Account balance: USD 9,778.04</div>
			</div>
		);
	}
}
