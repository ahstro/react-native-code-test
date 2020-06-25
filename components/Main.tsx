import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { Validated } from "../utils/validation";
import { State, Country } from "../store/state";
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
  country?: Country;
  countries: Array<Country>;
  submitting: boolean;
  setSocialSecurityNumber: (socialSecurityNumber: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmailAddress: (emailAddress: string) => void;
  setCountry: (country: Country) => void;
  submitButtonPressed: () => void;
}

const Main: React.StatelessComponent<MainProps> = props => (
  <View style={styles.container}>
    <ValidatedTextInput
      placeholder="YYMMDD-XXXX"
      onChangeText={props.setSocialSecurityNumber}
      validated={props.socialSecurityNumber}
      style={styles.box}
      keyboardType="number-pad"
    />
    <ValidatedTextInput
      placeholder="+46 7XX XXX XXX"
      onChangeText={props.setPhoneNumber}
      validated={props.phoneNumber}
      style={styles.box}
      keyboardType="phone-pad"
    />
    <ValidatedTextInput
      placeholder="jane.doe@example.com"
      onChangeText={props.setEmailAddress}
      validated={props.emailAddress}
      style={styles.box}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <Picker
      prompt="Select country..."
      style={styles.box}
      selectedValue={props.country}
      onValueChange={props.setCountry}
    >
      {props.countries.map(country => (
        <Picker.Item label={country.name} key={country.name} value={country} />
      ))}
    </Picker>
    <Button
      onPress={props.submitButtonPressed}
      title={props.submitting ? "Submitting" : "Submit"}
      disabled={props.submitting}
      accessibilityLabel="Submit form"
      color="#4583ff"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24
  },
  box: {
    marginVertical: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6
  }
});

export default connect(
  (state: State) => ({
    socialSecurityNumber: state.socialSecurityNumber,
    phoneNumber: state.phoneNumber,
    emailAddress: state.emailAddress,
    country: state.country,
    countries: state.countries,
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
