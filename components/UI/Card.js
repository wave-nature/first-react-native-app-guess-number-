import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    shadowColor: "black", //ios
    shadowOffset: { width: 0, height: 2 }, //ios
    shadowOpacity: 0.2, //ios
    shadowRadius: 6, //ios
    elevation: 6, //android
    padding: 10,
  },
});

export default Card;
