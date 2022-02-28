import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import color from "../constants/color";

const MainButton = (props) => {
  let ButtonComp = TouchableOpacity;
  if (Platform.OS === "android") {
    ButtonComp - TouchableNativeFeedback;
  }
  return (
    <ButtonComp onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </ButtonComp>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: color.primary,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "open-sans",
    fontSize: 15,
    color: "white",
  },
});

export default MainButton;
