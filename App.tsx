import React from "react";
import { Provider } from "react-redux";
import initializeStore from "./store";
import { fetchCountries } from "./store/actions";
import Main from "./components/Main";

const store = initializeStore();

// @ts-ignore TODO: Wtf TypeScript? Fix this. mapDispatchToProps?
store.dispatch(fetchCountries());

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
