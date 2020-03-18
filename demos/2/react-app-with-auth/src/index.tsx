import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Moodie from "./containers/Moodie";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./services/Auth";
import { GalleryContextProvider } from "./services/Gallery";
import config from "./config";

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

ReactDOM.render(
  <Router>
    <Auth0Provider
      domain={auth0Domain}
      client_id={auth0ClientId}
      redirect_uri={auth0RedirectUri}
      audience={auth0Audience}
    >
      <GalleryContextProvider>
        <Switch>
          <Route path="/:searchQuery" component={Moodie} />
          <Route path="/" component={Moodie} />
        </Switch>
      </GalleryContextProvider>
    </Auth0Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
