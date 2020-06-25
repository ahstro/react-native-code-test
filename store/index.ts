import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import thunk from "redux-thunk";
import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

export default () => {
  const store = createStore(
    persistReducer(persistConfig, reducer),
    applyMiddleware(thunk)
  );
  return {
    store,
    persistor: persistStore(store)
  };
};
