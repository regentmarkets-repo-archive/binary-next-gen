import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from "react-router";

import ApplicationRoute from "./ApplicationRoute";
import HomeRoute from "home/HomeRoute";
import LoginRoute from "login/LoginPage";
import SignupRoute from "signup/SignupRoute";
import TicksRoute from "ticks/TicksPage";
import OfferingsRoute from "offerings/OfferingsPage";
import ActiveSymbolsRoute from "active-symbols/ActiveSymbolsPage";
import MarketsRoute from "markets/MarketsPage";
import AssetIndexRoute from "asset-index/AssetIndexPage";

// polyfill
if(!Object.assign) Object.assign = React.__spread;

// export routes
module.exports = (
	<Route name="app" path="/" handler={ApplicationRoute}>
		<Route name="home" path="/home" handler={HomeRoute} />
		<Route name="login" path="/login" handler={LoginRoute} />
		<Route name="signup" path="/signup" handler={SignupRoute} />
		<Route name="ticks" path="/ticks" handler={TicksRoute} />
		<Route name="offerings" path="/offerings" handler={OfferingsRoute} />
		<Route name="activesymbols" path="/active-symbols" handler={ActiveSymbolsRoute} />
		<Route name="markets" path="/markets" handler={MarketsRoute} />
		<Route name="asset-index" path="/asset-index" handler={AssetIndexRoute} />

		<DefaultRoute handler={HomeRoute} />
		<NotFoundRoute handler={HomeRoute} />
	</Route>
);
