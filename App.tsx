import React from "react";
import { Provider } from "react-redux";
import initializeStore from "./store";
import Main from "./components/Main";

const store = initializeStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
