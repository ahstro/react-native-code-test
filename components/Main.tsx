import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { State } from "../store";

interface MainProps {
  text: string;
}

const Main: React.StatelessComponent<MainProps> = props => (
  <View style={styles.container}>
    <Text>{props.text}</Text>
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

export default connect((state: State) => ({ text: state.party }))(Main);
