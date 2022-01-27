import React from "react";
import { Text, View, StyleSheet } from "react-native";
import color from "../constants/color";

const NumberContainer = (props) => {
  return (
    <View>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  number: {
    color: color.secondary,
    borderColor: color.secondary,
    borderWidth: 1,
    fontSize: 24,
    fontWeight: "bold",
    padding: 6,
    margin: 10,
    borderRadius: 12,
  },
});

export default NumberContainer;
