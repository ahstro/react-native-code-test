export interface Action {
  type: Type;
  payload: any; // TODO: Specify
}

export enum Type {
  SET_SOCIAL_SECURITY_NUMBER,
  SET_PHONE_NUMBER,
  SET_EMAIL_ADDRESS,
  SET_COUNTRY
}

export const setSocialSecurityNumber: (
  socialSecurityNumber: string
) => Action = socialSecurityNumber => ({
  type: Type.SET_SOCIAL_SECURITY_NUMBER,
  payload: socialSecurityNumber
});

export const setPhoneNumber: (phoneNumber: string) => Action = phoneNumber => ({
  type: Type.SET_PHONE_NUMBER,
  payload: phoneNumber
});

export const setEmailAddress: (
  emailAddress: string
) => Action = emailAddress => ({
  type: Type.SET_EMAIL_ADDRESS,
  payload: emailAddress
});

export const setCountry: (country: string) => Action = country => ({
  type: Type.SET_COUNTRY,
  payload: country
});
