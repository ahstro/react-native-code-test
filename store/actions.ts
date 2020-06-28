import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { State } from "./state";
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
  CLEAR_FORM,
  FETCHING_COUNTRIES,
  FETCHED_COUNTRIES,
  SUBMIT_BUTTON_PRESSED
}

export type Action =
  | SetStringAction
  | SubmitSucceededAction
  | SubmitFailedAction
  | FetchingCountriesAction
  | FetchedCountriesAction
  | ClearFormAction;

interface SetStringAction {
  readonly type:
    | Type.SET_SOCIAL_SECURITY_NUMBER
    | Type.SET_PHONE_NUMBER
    | Type.SET_EMAIL_ADDRESS
    | Type.SET_COUNTRY;
  readonly payload: string;
}

interface SubmitFailedAction {
  readonly type: Type.SUBMIT_FAILED;
  readonly payload: {
    socialSecurityNumber: Validated<string>;
    phoneNumber: Validated<string>;
    emailAddress: Validated<string>;
    country: Validated<string>;
  };
}

interface SubmitSucceededAction {
  readonly type: Type.SUBMIT_SUCCEEDED;
}

interface ClearFormAction {
  readonly type: Type.CLEAR_FORM;
}

interface FetchingCountriesAction {
  readonly type: Type.FETCHING_COUNTRIES;
}

interface FetchedCountriesAction {
  readonly type: Type.FETCHED_COUNTRIES;
  readonly payload: Array<string>;
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

export const setCountry: ActionCreator<SetStringAction> = (
  country: string
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
    dispatch({ type: Type.SUBMIT_SUCCEEDED });
    console.log("Success");
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
>> = () => dispatch => {
  dispatch(fetchingCountries());
  fetch(COUNTRIES_ENDPOINT)
    .then((res: Response) => res.json())
    .then((countries: Array<{ name: string }>) => ({
      type: Type.FETCHED_COUNTRIES,
      payload: countries.map(country => country.name)
    }))
    .then(dispatch);
};

export const clearForm: ActionCreator<ClearFormAction> = () => ({
  type: Type.CLEAR_FORM
});
