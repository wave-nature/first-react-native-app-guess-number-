import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import color from "../constants/color";
import BodyText from "./Fonts/BodyText";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid,
        }),
      }}
    >
      <BodyText style={styles.headerTitle}>{props.title}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAndroid: {
    backgroundColor: color.primary,
  },
  headerIos: {
    backgroundColor: "white",
  },
  headerTitle: {
    color: "#000",
    fontSize: 18,
  },
});

export default Header;
