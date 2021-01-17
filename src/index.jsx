import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "rc-tooltip/assets/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    staleTime: 1000 * 60 * 60,
    cacheTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/youtube-playlist-manager/#">
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
