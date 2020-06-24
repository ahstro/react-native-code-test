/**
 * Validation module
 *
 * Use:
 *   import * as Validate, { Validity } from "./validation"
 *
 *   Validate.phoneNumber(str) // => Validity
 *
 * TODO: Write/lib these properly when you get internet access
 **/

import * as Normalize from "./normalization";

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

export const socialSecurityNumber: Validator<string> = socialSecurityNumber => {
  const normalized = Normalize.socialSecurityNumber(socialSecurityNumber);
  if (normalized.length < 10) {
    return { value: socialSecurityNumber, validity: Validity.Unchecked };
  }
  return {
    value: socialSecurityNumber,
    validity:
      normalized.length == 10 || normalized.length == 12
        ? Validity.Valid
        : Validity.Invalid
  };
};

export const phoneNumber: Validator<string> = phoneNumber => {
  const normalized = Normalize.phoneNumber(phoneNumber);
  if (normalized.length < 10) {
    return { value: phoneNumber, validity: Validity.Unchecked };
  }
  return { value: phoneNumber, validity: Validity.Valid };
};

export const emailAddress: Validator<string> = emailAddress => {
  const normalized = Normalize.emailAddress(emailAddress);
  if (normalized.length < 10) {
    return { value: emailAddress, validity: Validity.Unchecked };
  }
  return { value: emailAddress, validity: Validity.Valid };
};
