/**
 * Normalization module
 *
 * Use:
 *   import * as Normalize from "./normalization"
 *
 *   Normalize.phoneNumber(str) // => str
 *
 * TODO: Check all these against proper formats when you get internet access
 **/

type Normalizer<T> = (value: T) => T;

/**
 * Removes superfluous characters, and standardizes regional code
 * TODO: Add example
 **/
export const socialSecurityNumber: Normalizer<string> = socialSecurityNumber =>
  socialSecurityNumber.replace("-", "").replace(" ", "");

/**
 * Takes a phone number, removes superfluous characters, and standardizes regional code
 * Example:
 *   phoneNumber("07-12 3456 78") // => "+46 712 345 678"
 **/
export const phoneNumber: Normalizer<string> = phoneNumber =>
  phoneNumber
    .replace("-", "")
    .replace(" ", "")
    .replace(/^00?/, "+46");

/**
 * Basically just trims whitespace. Mostly here for consistency 🤷
 **/
export const emailAddress: Normalizer<string> = emailAddress =>
  emailAddress.trim();
