import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
// import store, { persistor } from "./store";

import "rc-tooltip/assets/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    staleTime: 1000 * 60 * 60,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  },
});

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <PersistGate persistor={persistor}> */}
    <BrowserRouter basename="/youtube-playlist-manager/#">
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
    {/* </PersistGate> */}
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
