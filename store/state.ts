import { Validity, Validated } from "../utils/validation";
import * as Validate from "../utils/validation";

export const INITIAL_STATE: State = {
  socialSecurityNumber: Validate.socialSecurityNumber(""),
  phoneNumber: Validate.phoneNumber(""),
  emailAddress: Validate.emailAddress(""),
  country: "",
  submitting: false
};

export interface State {
  socialSecurityNumber: Validated<string>;
  phoneNumber: Validated<string>;
  emailAddress: Validated<string>;
  country: string;
  submitting: boolean;
}
