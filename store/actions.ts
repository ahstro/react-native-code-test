import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { missingCountries, State } from "./state";
import { Country } from "./state/country";

/**
 * Actions
 **/

export enum Type {
  SET_SOCIAL_SECURITY_NUMBER,
  SET_PHONE_NUMBER,
  SET_EMAIL_ADDRESS,
  SET_COUNTRY,
  FETCHING_COUNTRIES,
  FETCHED_COUNTRIES,
  SUBMIT_BUTTON_PRESSED
}

export type Action =
  | SetStringAction
  | SetCountryAction
  | SubmitButtonPressedAction
  | FetchingCountriesAction
  | FetchedCountriesAction;

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

interface SubmitButtonPressedAction {
  readonly type: Type.SUBMIT_BUTTON_PRESSED;
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

export const submitButtonPressed: ActionCreator<SubmitButtonPressedAction> = () => ({
  type: Type.SUBMIT_BUTTON_PRESSED
});

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
  if (!missingCountries(getState())) {
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
