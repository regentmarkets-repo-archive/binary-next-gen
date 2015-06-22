import React from "react";
import { Route, DefaultRoute, NotFoundRoute } from "react-router";

/* eslint-disable no-multi-spaces */
// Only import from `route-handlers/*`
import Application from "route-handlers/Application";
import HomePage from "route-handlers/HomePage";
import NotFoundPage from "route-handlers/NotFoundPage";
import LoginPage from "route-handlers/LoginPage";
import SignupPage from "route-handlers/SignupPage";
import TicksPage from "route-handlers/TicksPage";
import OfferingsPage from "route-handlers/OfferingsPage";
import ActiveSymbolsPage from "route-handlers/ActiveSymbolsPage";
/* eslint-enable */

// polyfill
if(!Object.assign)
	Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle

// export routes
module.exports = (
	<Route name="app" path="/" handler={Application}>
		<Route name="home" path="/home" handler={HomePage} />
		<Route name="login" path="/login" handler={LoginPage} />
		<Route name="signup" path="/signup" handler={SignupPage} />
		<Route name="ticks" path="/ticks" handler={TicksPage} />
		<Route name="offerings" path="/offerings" handler={OfferingsPage} />
		<Route name="activesymbols" path="/active-symbols" handler={ActiveSymbolsPage} />

		<DefaultRoute handler={HomePage} />
		<NotFoundRoute handler={NotFoundPage} />
	</Route>
);
