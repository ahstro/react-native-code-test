export const INITIAL_STATE: State = {
  socialSecurityNumber: "",
  phoneNumber: "",
  emailAddress: "",
  country: ""
};

export interface State {
  socialSecurityNumber: string;
  phoneNumber: string;
  emailAddress: string;
  country: string;
}
