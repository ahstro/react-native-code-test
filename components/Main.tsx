import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { Validated as TValidated } from "../utils/validation";
import { State } from "../store/state";
import { Country, PLACEHOLDER_COUNTRY } from "../store/state/country";
import {
  setSocialSecurityNumber,
  setPhoneNumber,
  setEmailAddress,
  setCountry,
  submitButtonPressed,
  clearButtonPressed
} from "../store/actions";
import Validated from "./Validated";

interface MainProps {
  socialSecurityNumber: TValidated<string>;
  phoneNumber: TValidated<string>;
  emailAddress: TValidated<string>;
  country: TValidated<Country>;
  countries: Array<Country>;
  submitted: boolean;
  setSocialSecurityNumber: (socialSecurityNumber: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmailAddress: (emailAddress: string) => void;
  setCountry: (country: Country) => void;
  submitButtonPressed: () => void;
  clearButtonPressed: () => void;
}

const Main: React.StatelessComponent<MainProps> = props => (
  <View style={styles.container}>
    <ScrollView style={styles.form}>
      <Validated
        style={styles.box}
        validity={props.socialSecurityNumber.validity}
      >
        <TextInput
          placeholder="YYMMDD-XXXX"
          onChangeText={props.setSocialSecurityNumber}
          value={props.socialSecurityNumber.value}
          keyboardType="number-pad"
        />
      </Validated>
      <Validated style={styles.box} validity={props.phoneNumber.validity}>
        <TextInput
          placeholder="+46 7XX XXX XXX"
          onChangeText={props.setPhoneNumber}
          value={props.phoneNumber.value}
          keyboardType="phone-pad"
        />
      </Validated>
      <Validated style={styles.box} validity={props.emailAddress.validity}>
        <TextInput
          placeholder="jane.doe@example.com"
          onChangeText={props.setEmailAddress}
          value={props.emailAddress.value}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Validated>
      <Validated
        style={[styles.box, styles.picker]}
        validity={props.country.validity}
      >
        <Picker
          selectedValue={props.country.value}
          onValueChange={props.setCountry}
        >
          <Picker.Item
            color="#c8c8c8"
            label={PLACEHOLDER_COUNTRY.name}
            key="placeholder"
            value={PLACEHOLDER_COUNTRY}
          />
          {props.countries.map(country => (
            <Picker.Item
              label={country.name}
              key={country.name}
              value={country}
            />
          ))}
        </Picker>
      </Validated>
    </ScrollView>
    <View style={styles.buttons}>
      <View style={styles.clearButton}>
        <Button
          onPress={props.clearButtonPressed}
          title="Clear"
          accessibilityLabel="Clear form"
          color="#f54242"
        />
      </View>
      <View style={styles.submitButton}>
        <Button
          onPress={props.submitButtonPressed}
          title={props.submitted ? "Submitted!" : "Submit"}
          disabled={props.submitted}
          accessibilityLabel="Submit form"
          color="#4583ff"
        />
      </View>
    </View>
  </View>
);

const SPACING = 24;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingVertical: SPACING
  },
  form: {
    flex: 1,
    paddingHorizontal: SPACING
  },
  buttons: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: SPACING
  },
  clearButton: {
    flexGrow: 1,
    flexBasis: 0,
    marginRight: SPACING
  },
  submitButton: {
    flexGrow: 1,
    flexBasis: 0
  },
  box: {
    marginVertical: SPACING / 2
  },
  picker: {
    paddingVertical: 0,
    paddingHorizontal: 4
  }
});

export default connect(
  (state: State) => ({
    socialSecurityNumber: state.socialSecurityNumber,
    phoneNumber: state.phoneNumber,
    emailAddress: state.emailAddress,
    country: state.country,
    countries: state.countries,
    submitted: state.submitted
  }),
  {
    setSocialSecurityNumber,
    setPhoneNumber,
    setEmailAddress,
    setCountry,
    submitButtonPressed,
    clearButtonPressed
  }
)(Main);
