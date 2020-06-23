import { ActionCreator } from "redux";

/**
 * Actions
 **/

export enum Type {
  SET_SOCIAL_SECURITY_NUMBER,
  SET_PHONE_NUMBER,
  SET_EMAIL_ADDRESS,
  SET_COUNTRY,
  SUBMIT_BUTTON_PRESSED
}

export type Action = SetStringAction | SubmitButtonPressedAction;

interface SetStringAction {
  readonly type:
    | Type.SET_SOCIAL_SECURITY_NUMBER
    | Type.SET_PHONE_NUMBER
    | Type.SET_EMAIL_ADDRESS
    | Type.SET_COUNTRY;
  readonly payload: string;
}

interface SubmitButtonPressedAction {
  readonly type: Type.SUBMIT_BUTTON_PRESSED;
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

export const submitButtonPressed: ActionCreator<SubmitButtonPressedAction> = () => ({
  type: Type.SUBMIT_BUTTON_PRESSED
});
