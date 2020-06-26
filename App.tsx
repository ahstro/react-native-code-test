import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import initializeStore from "./store";
import { fetchCountries } from "./store/actions";
import Form from "./components/Form";

const { store, persistor } = initializeStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Form />
      </PersistGate>
    </Provider>
  );
}
