import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { persistConfig } from "./persist";

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
