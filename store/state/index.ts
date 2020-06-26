import { Validity, Validated } from "../../utils/validation";
import * as Validate from "../../utils/validation";
import { PLACEHOLDER_COUNTRY } from "./country";

/**
 * Types
 **/

export interface State {
  socialSecurityNumber: Validated<string>;
  phoneNumber: Validated<string>;
  emailAddress: Validated<string>;
  country: Validated<string>;
  countries: Array<string>;
  submitted: boolean;
}

/**
 * Constants
 **/
export const INITIAL_STATE: State = {
  socialSecurityNumber: Validate.socialSecurityNumber(""),
  phoneNumber: Validate.phoneNumber(""),
  emailAddress: Validate.emailAddress(""),
  country: Validate.country(PLACEHOLDER_COUNTRY),
  countries: [],
  submitted: false
};
