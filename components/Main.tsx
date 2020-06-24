import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { connect } from "react-redux";
import { Validated } from "../utils/validation";
import { State } from "../store/state";
import {
  setSocialSecurityNumber,
  setPhoneNumber,
  setEmailAddress,
  setCountry,
  submitButtonPressed
} from "../store/actions";
import ValidatedTextInput from "./ValidatedTextInput";

interface MainProps {
  socialSecurityNumber: Validated<string>;
  phoneNumber: Validated<string>;
  emailAddress: Validated<string>;
  country: string;
  submitting: boolean;
  setSocialSecurityNumber: (socialSecurityNumber: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmailAddress: (emailAddress: string) => void;
  setCountry: (country: string) => void;
  submitButtonPressed: () => void;
}

const Main: React.StatelessComponent<MainProps> = props => (
  <View style={styles.container}>
    <ValidatedTextInput
      placeholder="socialSecurityNumber"
      onChangeText={props.setSocialSecurityNumber}
      validated={props.socialSecurityNumber}
    />
    <ValidatedTextInput
      placeholder="phoneNumber"
      onChangeText={props.setPhoneNumber}
      validated={props.phoneNumber}
    />
    <ValidatedTextInput
      placeholder="emailAddress"
      onChangeText={props.setEmailAddress}
      validated={props.emailAddress}
    />
    <TextInput
      placeholder="country"
      onChangeText={props.setCountry}
      value={props.country}
    />
    <Button
      onPress={props.submitButtonPressed}
      title={props.submitting ? "Submitting" : "Submit"}
      disabled={props.submitting}
      accessibilityLabel="Submit form"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(
  (state: State) => ({
    socialSecurityNumber: state.socialSecurityNumber,
    phoneNumber: state.phoneNumber,
    emailAddress: state.emailAddress,
    country: state.country,
    submitting: state.submitting
  }),
  {
    setSocialSecurityNumber,
    setPhoneNumber,
    setEmailAddress,
    setCountry,
    submitButtonPressed
  }
)(Main);
