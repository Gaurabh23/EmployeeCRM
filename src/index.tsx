import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App';
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import contactReducer from "./Redux/Reducer/contactReducer";
import { Provider } from "react-redux";

const store = createStore(contactReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
