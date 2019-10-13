import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import * as serviceWorker from "./app/serviceWorker";

/* Progressive Web App */
/* REF: https://create-react-app.dev/docs/making-a-progressive-web-app */
const isPWA = false; // Disable caching during development.

ReactDOM.render(<App />, document.getElementById("root"));
isPWA ? serviceWorker.register() : serviceWorker.unregister();
