import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { fetchCountries, clearButtonPressed } from "../store/actions";
import { State } from "../store/state";
import { persistConfig } from "../store/persist";

interface Props {
  countries: Array<string>;
  fetchCountries: () => void;
  clearButtonPressed: () => void;
  shouldPurge: boolean;
  children: React.ReactNode;
}

class DataGate extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.fetchCountriesIfMissing = this.fetchCountriesIfMissing.bind(this);
    this.countriesAreMissing = this.countriesAreMissing.bind(this);
  }

  countriesAreMissing() {
    return this.props.countries.length === 0;
  }

  fetchCountriesIfMissing() {
    if (this.countriesAreMissing()) {
      this.props.fetchCountries();
    }
  }

  componentDidMount() {
    this.fetchCountriesIfMissing();
    if (this.props.shouldPurge) {
      this.props.clearButtonPressed();
    }
  }

  componentDidUpdate() {
    this.fetchCountriesIfMissing();
  }

  render() {
    return this.countriesAreMissing() ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    ) : (
      this.props.children
    );
  }
}

export default connect(
  (state: State) => ({
    countries: state.countries,
    shouldPurge: state.submitted
  }),
  {
    fetchCountries,
    clearButtonPressed
  }
)(DataGate);
