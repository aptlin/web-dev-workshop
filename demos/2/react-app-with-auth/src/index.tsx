import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withTracker } from "./components/withTracker";
import config from "./config";
import * as Sentry from "@sentry/browser";
import Moodie from "./containers/Moodie";
import { Auth0Provider } from "./services/Auth";
import { GalleryContextProvider } from "./services/Gallery";
import * as serviceWorker from "./serviceWorker";
import { FavoritesContextProvider } from "./services/Favorites";

Sentry.init({ dsn: config.constants.SENTRY_DOMAIN });

const auth0Domain = config.constants.AUTH0_DOMAIN;
const auth0ClientId = config.constants.AUTH0_CLIENT_ID;
const auth0Audience = config.constants.AUTH0_AUDIENCE;
const auth0RedirectUri = window.location.origin;

if (
  auth0Domain === undefined ||
  auth0ClientId === undefined ||
  auth0Audience === undefined
) {
  throw new Error("missing env vars");
}

const TrackedMoodie = withTracker(Moodie);
ReactDOM.render(
  <Router>
    <Auth0Provider
      domain={auth0Domain}
      client_id={auth0ClientId}
      redirect_uri={auth0RedirectUri}
      audience={auth0Audience}
    >
      <GalleryContextProvider>
        <FavoritesContextProvider>
          <Switch>
            <Route path="/:searchQuery" component={TrackedMoodie} />
            <Route path="/" component={TrackedMoodie} />
          </Switch>
        </FavoritesContextProvider>
      </GalleryContextProvider>
    </Auth0Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
