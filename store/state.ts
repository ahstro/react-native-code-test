import { Validity, Validated } from "../utils/validation";
import * as Validate from "../utils/validation";

export const INITIAL_STATE: State = {
  socialSecurityNumber: Validate.socialSecurityNumber(""),
  phoneNumber: Validate.phoneNumber(""),
  emailAddress: Validate.emailAddress(""),
  country: undefined,
  countries: [],
  submitting: false
};

export interface State {
  socialSecurityNumber: Validated<string>;
  phoneNumber: Validated<string>;
  emailAddress: Validated<string>;
  country?: Country;
  countries: Array<Country>;
  submitting: boolean;
}

export interface Country {
  flag: string;
  name: string;
}

export const missingCountries: (s: State) => boolean = state =>
  state.countries.length === 0;
