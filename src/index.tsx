/* VENDOR */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react"
import store, {persistor} from "./redux/store";



/* APPLICATION */
import App from "./components/App/App";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
              <App />
          </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
