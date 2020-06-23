import { createStore } from "redux";

const INITIAL_STATE = {
  party: "All day!"
};

export interface State {
  party: string;
}

interface Action {
  type: ActionType;
}

type ActionType = "NOTHING";

const reducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case "NOTHING":
      return state;
    default:
      return state;
  }
};

export default createStore(reducer);
