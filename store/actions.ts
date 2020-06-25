import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { isMissingCountries, State } from "./state";
import { Country } from "./state/country";
import * as Validate from "../utils/validation";
import { Validity, Validated } from "../utils/validation";

/**
 * Actions
 **/

export enum Type {
  SET_SOCIAL_SECURITY_NUMBER,
  SET_PHONE_NUMBER,
  SET_EMAIL_ADDRESS,
  SET_COUNTRY,
  SUBMIT_FAILED,
  SUBMIT_SUCCEEDED,
  CLEAR_BUTTON_PRESSED,
  FETCHING_COUNTRIES,
  FETCHED_COUNTRIES,
  SUBMIT_BUTTON_PRESSED
}

export type Action =
  | SetStringAction
  | SetCountryAction
  | SubmitSucceededAction
  | SubmitFailedAction
  | FetchingCountriesAction
  | FetchedCountriesAction
  | ClearButtonPressedAction;

interface SetStringAction {
  readonly type:
    | Type.SET_SOCIAL_SECURITY_NUMBER
    | Type.SET_PHONE_NUMBER
    | Type.SET_EMAIL_ADDRESS;
  readonly payload: string;
}

interface SetCountryAction {
  readonly type: Type.SET_COUNTRY;
  readonly payload: Country;
}

interface SubmitFailedAction {
  readonly type: Type.SUBMIT_FAILED;
  readonly payload: {
    socialSecurityNumber: Validated<string>;
    phoneNumber: Validated<string>;
    emailAddress: Validated<string>;
    country: Validated<Country>;
  };
}

interface SubmitSucceededAction {
  readonly type: Type.SUBMIT_SUCCEEDED;
}

interface ClearButtonPressedAction {
  readonly type: Type.CLEAR_BUTTON_PRESSED;
}

interface FetchingCountriesAction {
  readonly type: Type.FETCHING_COUNTRIES;
}

interface FetchedCountriesAction {
  readonly type: Type.FETCHED_COUNTRIES;
  readonly payload: Array<Country>;
}

/**
 * Action creators
 **/

export const setSocialSecurityNumber: ActionCreator<SetStringAction> = (
  socialSecurityNumber: string
) => ({
  type: Type.SET_SOCIAL_SECURITY_NUMBER,
  payload: socialSecurityNumber
});

export const setPhoneNumber: ActionCreator<SetStringAction> = (
  phoneNumber: string
) => ({
  type: Type.SET_PHONE_NUMBER,
  payload: phoneNumber
});

export const setEmailAddress: ActionCreator<SetStringAction> = (
  emailAddress: string
) => ({
  type: Type.SET_EMAIL_ADDRESS,
  payload: emailAddress
});

export const setCountry: ActionCreator<SetCountryAction> = (
  country: Country
) => ({
  type: Type.SET_COUNTRY,
  payload: country
});

export const submitButtonPressed: ActionCreator<ThunkAction<
  void,
  State,
  unknown,
  SubmitSucceededAction | SubmitFailedAction
>> = () => (dispatch, getState) => {
  const state = getState();
  const strictlyValidated = {
    socialSecurityNumber: Validate.strict(state.socialSecurityNumber),
    phoneNumber: Validate.strict(state.phoneNumber),
    emailAddress: Validate.strict(state.emailAddress),
    country: Validate.strict(state.country)
  };
  const anyInvalid: boolean = Object.values(strictlyValidated)
    .map(validated => validated.validity)
    .some(validity => validity === Validity.Invalid);
  if (anyInvalid) {
    dispatch({ type: Type.SUBMIT_FAILED, payload: strictlyValidated });
  } else {
    console.log("Success");
    dispatch({
      type: Type.SUBMIT_SUCCEEDED
    });
  }
};

const fetchingCountries: ActionCreator<FetchingCountriesAction> = () => ({
  type: Type.FETCHING_COUNTRIES
});

const COUNTRIES_ENDPOINT = "https://restcountries.eu/rest/v2/all";
export const fetchCountries: ActionCreator<ThunkAction<
  void,
  State,
  unknown,
  FetchingCountriesAction | FetchedCountriesAction
>> = () => (dispatch, getState) => {
  if (!isMissingCountries(getState())) {
    return;
  }
  dispatch(fetchingCountries());
  fetch(COUNTRIES_ENDPOINT)
    .then((res: Response) => res.json())
    .then((countries: Array<Country>) => ({
      type: Type.FETCHED_COUNTRIES,
      payload: countries
    }))
    .then(dispatch);
};

export const clearButtonPressed: ActionCreator<ClearButtonPressedAction> = () => ({
  type: Type.CLEAR_BUTTON_PRESSED
});
