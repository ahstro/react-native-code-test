import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle, Text } from "react-native";
import { Validity } from "../utils/validation";

interface Props extends ViewProps {
  validity: Validity;
}

const Validated: React.StatelessComponent<Props> = props => (
  <View
    {...props}
    style={[styles.base, getValidityStyle(props.validity), props.style]}
  >
    <View style={styles.children}>{props.children}</View>
    <Icon validity={props.validity} />
  </View>
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

const Icon: React.StatelessComponent<{ validity: Validity }> = props => {
  switch (props.validity) {
    case Validity.Valid:
      return <Text style={[styles.icon, styles.validIcon]}>✔</Text>;
    case Validity.Invalid:
      return <Text style={[styles.icon, styles.invalidIcon]}>✘</Text>;
    case Validity.Unchecked:
      return <Text />;
  }
};

const Color = {
  valid: "#b3dea9",
  invalid: "#f58484",
  unchecked: "#aab0bd"
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: "solid"
  },
  valid: { borderColor: Color.valid },
  invalid: { borderColor: Color.invalid },
  unchecked: { borderColor: Color.unchecked },
  children: { flexGrow: 1 },
  icon: { width: 16 },
  validIcon: { color: Color.valid },
  invalidIcon: { color: Color.invalid }
});

export default Validated;
