import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import initializeStore from "./store";
import { fetchCountries } from "./store/actions";
import Main from "./components/Main";

const { store, persistor } = initializeStore();

// @ts-ignore TODO: Wtf TypeScript? Fix this. mapDispatchToProps?
store.dispatch(fetchCountries());

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
