import React from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
import { Validated, Validity } from "../utils/validation";

interface Props extends TextInputProps {
  validated: Validated<string>;
}

const ValidatedTextInput: React.StatelessComponent<Props> = props => (
  <TextInput
    {...props}
    style={[
      props.style,
      styles.base,
      getValidityStyle(props.validated.validity)
    ]}
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
    borderWidth: 2,
    borderStyle: "solid"
  },
  valid: { borderColor: "#b3dea9" },
  invalid: { borderColor: "#f58484" },
  unchecked: { borderColor: "#aab0bd" }
});

export default ValidatedTextInput;
