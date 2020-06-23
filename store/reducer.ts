import { INITIAL_STATE, State } from "./state";
import { Action, Type as ActionType } from "./actions";

export default (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.SET_SOCIAL_SECURITY_NUMBER:
      return { ...state, socialSecurityNumber: action.payload };
    case ActionType.SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case ActionType.SET_EMAIL_ADDRESS:
      return { ...state, emailAddress: action.payload };
    case ActionType.SET_COUNTRY:
      return { ...state, country: action.payload };
    default:
      return state;
  }
};
