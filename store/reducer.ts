import { INITIAL_STATE, State } from "./state";
import { Action, Type as ActionType } from "./actions";
import * as Validate from "../utils/validation";

export default (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.SET_SOCIAL_SECURITY_NUMBER:
      return {
        ...state,
        socialSecurityNumber: Validate.socialSecurityNumber(action.payload)
      };
    case ActionType.SET_PHONE_NUMBER:
      return { ...state, phoneNumber: Validate.phoneNumber(action.payload) };
    case ActionType.SET_EMAIL_ADDRESS:
      return { ...state, emailAddress: Validate.emailAddress(action.payload) };
    case ActionType.SET_COUNTRY:
      return { ...state, country: Validate.country(action.payload) };
    case ActionType.FETCHING_COUNTRIES:
      return state;
    case ActionType.FETCHED_COUNTRIES:
      return { ...state, countries: action.payload };
    case ActionType.SUBMIT_SUCCEEDED:
      return { ...state, submitted: true };
    case ActionType.SUBMIT_FAILED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
