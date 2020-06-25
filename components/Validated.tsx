import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { Validity } from "../utils/validation";

interface Props extends ViewProps {
  validity: Validity;
}

const Validated: React.StatelessComponent<Props> = props => (
  <View
    {...props}
    style={[styles.base, getValidityStyle(props.validity), props.style]}
  />
);

const getValidityStyle: (validity: Validity) => ViewStyle = validity => {
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: "solid"
  },
  valid: { borderColor: "#b3dea9" },
  invalid: { borderColor: "#f58484" },
  unchecked: { borderColor: "#aab0bd" }
});

export default Validated;
