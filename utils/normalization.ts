/**
 * Normalization module
 *
 * Use:
 *   import * as Normalize from "./normalization"
 *
 *   Normalize.phoneNumber(str) // => string
 *
 **/

type Normalizer<T> = (value: T) => T;

/**
 * Removes superfluous characters, and standardizes regional code
 **/
export const socialSecurityNumber: Normalizer<string> = socialSecurityNumber =>
  socialSecurityNumber.replace(/\s/g, "");

/**
 * Takes a phone number, removes superfluous characters, and standardizes regional code
 * Example:
 *   phoneNumber("07-12 3456 78") // => "+46 712 345 678"
 **/
export const phoneNumber: Normalizer<string> = phoneNumber =>
  phoneNumber
    .replace(/[-\s()]/g, "") // Remove superflous characters
    .replace(/^00/, "+") // Replace international call prefix with +
    .replace(/^0/, "+46"); // Replace leading 0 with country code

/**
 * Basically just trims whitespace. Mostly here for consistency 🤷
 **/
export const emailAddress: Normalizer<string> = emailAddress =>
  emailAddress.trim();
