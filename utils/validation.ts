/**
 * Validation module
 *
 * Use:
 *   import * as Validate from "./validation"
 *
 *   Validate.phoneNumber(someString) // => Validated<string>
 *
 **/

import Personnummer from "personnummer";
import * as Normalize from "./normalization";
import { Country, PLACEHOLDER_COUNTRY } from "../store/state/country";

export enum Validity {
  Valid,
  Invalid,
  Unchecked
}

type Validator<T> = (value: T) => Validated<T>;

export interface Validated<T> {
  value: T;
  validity: Validity;
}

const MINIMUM_NORMALIZED_SSN_LENGTH = 10;
export const socialSecurityNumber: Validator<string> = socialSecurityNumber => {
  const normalized = Normalize.socialSecurityNumber(socialSecurityNumber);
  if (normalized.length < MINIMUM_NORMALIZED_SSN_LENGTH) {
    return { value: socialSecurityNumber, validity: Validity.Unchecked };
  }
  return {
    value: socialSecurityNumber,
    validity: Personnummer.valid(normalized) ? Validity.Valid : Validity.Invalid
  };
};

const PHONE_NUMBER_REGEX = /^\+46\d{6,12}$/;
const MINIMUM_NORMALIZED_PHONE_NO_LENGTH = 9;
export const phoneNumber: Validator<string> = phoneNumber => {
  const normalized = Normalize.phoneNumber(phoneNumber);
  if (normalized.length < MINIMUM_NORMALIZED_PHONE_NO_LENGTH) {
    return { value: phoneNumber, validity: Validity.Unchecked };
  }
  return {
    value: phoneNumber,
    validity: PHONE_NUMBER_REGEX.test(normalized)
      ? Validity.Valid
      : Validity.Invalid
  };
};

// Regex taken from emailregex.com. Not about to try writing an email regex again... 🤷
const EMAIL_ADDRESS_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MINIMUM_NORMALIZED_EMAIL_ADDRESS_LENGTH = 1;
export const emailAddress: Validator<string> = emailAddress => {
  const normalized = Normalize.emailAddress(emailAddress);
  if (normalized.length < MINIMUM_NORMALIZED_EMAIL_ADDRESS_LENGTH) {
    return { value: normalized, validity: Validity.Unchecked };
  }
  return {
    value: normalized,
    validity: EMAIL_ADDRESS_REGEX.test(normalized)
      ? Validity.Valid
      : Validity.Invalid
  };
};

export const country: Validator<Country> = country => {
  return {
    value: country,
    validity:
      country === PLACEHOLDER_COUNTRY ? Validity.Unchecked : Validity.Valid
  };
};

/**
 * Takes any validated and turns Unchecked into Invalid
 **/
export const strict: Validator<any> = validated => ({
  ...validated,
  validity:
    validated.validity === Validity.Unchecked
      ? Validity.Invalid
      : validated.validity
});
