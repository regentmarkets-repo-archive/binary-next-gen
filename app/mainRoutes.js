import React from "react";
import { Route, DefaultRoute, NotFoundRoute } from "react-router";

/* eslint-disable no-multi-spaces */
// Only import from `route-handlers/*`
import Application from "route-handlers/Application";
import HomeRoute from "./home/HomeRoute";
import NotFoundPage from "route-handlers/NotFoundPage";
import LoginRoute from "login/LoginPage";
import SignupRoute from "signup/SignupRoute";
import TicksRoute from "ticks/TicksPage";
import OfferingsRoute from "offerings/OfferingsPage";
import ActiveSymbolsRoute from "active-symbols/ActiveSymbolsPage";
/* eslint-enable */

// polyfill
if(!Object.assign)
	Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle

// export routes
module.exports = (
	<Route name="app" path="/" handler={Application}>
		<Route name="home" path="/home" handler={HomeRoute} />
		<Route name="login" path="/login" handler={LoginRoute} />
		<Route name="signup" path="/signup" handler={SignupRoute} />
		<Route name="ticks" path="/ticks" handler={TicksRoute} />
		<Route name="offerings" path="/offerings" handler={OfferingsRoute} />
		<Route name="activesymbols" path="/active-symbols" handler={ActiveSymbolsRoute} />

		<DefaultRoute handler={HomeRoute} />
		<NotFoundRoute handler={NotFoundPage} />
	</Route>
);
