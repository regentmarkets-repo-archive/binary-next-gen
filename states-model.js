/*
	< > indicate placeholder
	data are normalized, and thus have deeper nesting
*/

states: {
	business: {
		tick_subscriptions: {
			<symbol>: {
				epoch,
				id,
				quote
			},
		},
		price_subscriptions: {
			<id> : {
				longcode,
				spot,
				spot_time,
				ask_price,
				display_value,
				date_start,
				payout,
				spread
			},
		},
		transactions: {
			<transaction_id> : {
				balance_after,
				contract_id,
				transaction_time,
				action_type,
				amount,
				longcode,
				shortcode
			},
		},
		watchlist: [<symbol>, ],
		account: {
			loginid,
			email,
			currency,
			balance,
			fullname,
			token
		},
		assets: {
			<symbol>: {								// symbol as key as usually we want to refer via symbol, instead of market and sub-market
				intraday_interval_minutes,
				symbol_type,
				exchange_is_open,
				exchange_name,
				delay_amount,
				display_name,
				is_trading_suspended,
				quoted_currency_symbol,
				market,
				market_display_name,
				submarket,
				submarket_display_name,
				pip,
				contracts_available: [
					{
						contracts_display,
						max_contract_duration,
						barrier_category,
						payout_limit,
						submarket,
						exchange_name,
						contract_category_display,
						contract_type,
						min_contract_duration,
						sentiment,
						barriers,
						contract_category,
						start_type,
						expiry_type,
						forward_starting_options: [],	// no idea what is this
						available_barriers: [],			// no idea what is this
						trading_period						// no idea what is this
					}
				],
				trading_times: {
					events: {
						description,			//API returns descrip, LOL
						dates,					//API return day eg. Friday ....
					},
					settlement,
					open_time,
					close_time,
				}
			},
		},
		news: [
			{
				title,
				publish_date,
				description,
				contents
			},
		],
		payment_agents: [
			{
				telephone,
				login_id,
				supported_banks: ["CIMB"],
				summary,
				name,
				deposit_commission,
				currencies: [],
				url,
				info,
				withdrawal_commission,
				email,
			},
		],
		open_contracts: {
			<contract_id>: {
				transaction_id,
				purchase_time,
				symbol,
				payout,
				buy_price,
				contract_type,
				currency,
				longcode,
				ask_price,				//price of similar contract at latest spottime
				high_barrier,
				low_barrier,
				barrier,
				bid_price,				//price of this contract, used for sell aka indicative
				current_spot,
				current_spot_time,
				entry_spot,
				date_settlement,
				date_expiry,
				date_start,
				stream_id,
				is_expired,
				is_forward_starting,
				is_intraday,
				is_path_dependent,
				is_valid_to_sell,
				shortcode,
				display_value,
				entry_tick,
				entry_tick_time,
				exit_tick,
				exit_tick_time,
				prediction,
				tick_count,
				validation_error
			},
		},
		settings: {
			max_account_balance,
			max_daily_turnover,
			max_daily_losses,
			max_7day_turnover,
			max_7day_losses,
			max_30day_turnover,
			max_30day_losses,
			session_duration_limit,
			lifetime_limit,
			num_of_days,
			num_of_days_limit,
			max_open_positions,
			max_payout,
			min_remainder,
			withdrawal_for_x_days_monetary,
			withdrawal_since_inception_monetary,
			exclude_until
		},
		account: {
			email,
			currency,
			balance,
			loginid,
			fullname,
			language,
			date_of_birth,
			country,
			country_code,
			address_line_1,
			address_line_2,
			address_city,
			address_state,
			address_postcode,
			phone
		},
		countries: {
			<country_code>: {
				display_name,
				states: [
					{
						text,
						value
					}
				]
			}
		},
		videos: [
			{
				img_src,
				title,
				video_id
			}
		]
	},
	ui: {
		// to be added
	}
}