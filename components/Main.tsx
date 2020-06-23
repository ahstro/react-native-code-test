import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { State } from "../store/state";
import {
  setSocialSecurityNumber,
  setPhoneNumber,
  setEmailAddress,
  setCountry
} from "../store/actions";

interface MainProps {
  socialSecurityNumber: string;
  phoneNumber: string;
  emailAddress: string;
  country: string;
  setSocialSecurityNumber: (socialSecurityNumber: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmailAddress: (emailAddress: string) => void;
  setCountry: (country: string) => void;
}

const Main: React.StatelessComponent<MainProps> = props => (
  <View style={styles.container}>
    <TextInput
      placeholder="socialSecurityNumber"
      onChangeText={props.setSocialSecurityNumber}
      value={props.socialSecurityNumber}
    />
    <TextInput
      placeholder="phoneNumber"
      onChangeText={props.setPhoneNumber}
      value={props.phoneNumber}
    />
    <TextInput
      placeholder="emailAddress"
      onChangeText={props.setEmailAddress}
      value={props.emailAddress}
    />
    <TextInput
      placeholder="country"
      onChangeText={props.setCountry}
      value={props.country}
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
    country: state.country
  }),
  {
    setSocialSecurityNumber,
    setPhoneNumber,
    setEmailAddress,
    setCountry
  }
)(Main);
