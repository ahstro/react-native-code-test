import React from "react";
import { Text } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import initializeStore from "./store";
import { fetchCountries } from "./store/actions";
import Form from "./components/Form";
import DataGate from "./components/DataGate";

const { store, persistor } = initializeStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataGate>
          <Form />
        </DataGate>
      </PersistGate>
    </Provider>
  );
}
