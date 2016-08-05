This UI is coded with a few assumptions, which should always be true.

1. Tick trade will not have barrier, unless it's a digit trade, reason is that the duration is too short.
2. Barriers value are interpreted differently depends on the duration input, if the contract span over 24 hours, the barrier(s) are interpreted as absolute value, otherwise it is interpreted as relative value, reason being that transaction happens for the next tick, to prevent some client having a faster feed, thus, having a better estimation for his bet, we do not allow betting on absolute value, this only apply to intraday contract, because the value of single tick diminish when contract time is long, we use intraday simply because it's easier for quants.
3. ticks is always within 5 to 10
4. digit trade is always ticks only
5. barriers are non available for contract below 2 minutes
6. For underlying that's under our control, we allow relative and absolute barrier regardless of intraday or not
7. Relative barrier is always allowed
8. Forward starting do not have barriers
9. All underlying have rise/fall trade

possibly a better approach would be notify user for wrong info instead of change to correct value automatically, default may not be a good idea at all as client might always want to input value.
