import React from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
import { Validated, Validity } from "../utils/validation";

interface Props extends TextInputProps {
  validated: Validated<string>;
}

const ValidatedTextInput: React.StatelessComponent<Props> = props => (
  <TextInput
    {...props}
    style={[styles.base, getValidityStyle(props.validated.validity)]}
    value={props.validated.value}
  />
);

const getValidityStyle: (validity: Validity) => TextStyle = validity => {
  switch (validity) {
    case Validity.Valid:
      return styles.valid;
    case Validity.Invalid:
      return styles.invalid;
    case Validity.Unchecked:
      return styles.unchecked;
  }
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  valid: { borderColor: "green" },
  invalid: { borderColor: "red" },
  unchecked: { borderColor: "grey" }
});

export default ValidatedTextInput;
