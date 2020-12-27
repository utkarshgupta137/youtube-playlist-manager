import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { initClient } from "./api/apiHandler";
import store, { persistor } from "./store";

import "./index.css";

initClient()
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );
    return true;
  })
  .catch(() => {
    return false;
  });
