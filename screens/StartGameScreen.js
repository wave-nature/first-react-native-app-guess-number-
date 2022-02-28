import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Input from "../components/Input";
import Card from "../components/UI/Card";
import NumberContainer from "../components/NumberContainer";
import color from "../constants/color";
import TitleText from "../components/Fonts/TitleText";
import MainButton from "../components/MainButton";

class StartGameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTextValue: "",
      confirmText: false,
      selectedNumber: undefined,
      buttonWidth: Dimensions.get("window").width / 4,
    };
  }

  layoutChanges = () => {
    this.setState({ buttonWidth: Dimensions.get("window").width / 4 });
  };

  inputTextChangeHandler = (inputText) => {
    this.setState({ inputTextValue: inputText.replace(/[^0-9]/g, "") });
  };

  resetTextHandler = () => {
    this.setState({ inputTextValue: "", confirmText: false });
  };
  componentDidMount() {
    Dimensions.addEventListener("change", this.layoutChanges);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.layoutChanges);
  }

  confirmTextHandler = () => {
    const choosenNumber = parseInt(this.state.inputTextValue);

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert(
        "Invalid Number",
        "Please enter number between 1 and 99",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: this.resetTextHandler,
          },
        ],
        {
          cancelable: true,
          onDismiss: this.resetTextHandler,
        }
      );
      return;
    }
    this.setState({
      inputTextValue: "",
      selectedNumber: choosenNumber,
      confirmText: true,
    });
    Keyboard.dismiss();
  };

  render() {
    let confirmOutput;
    if (this.state.confirmText) {
      confirmOutput = (
        <Card style={styles.startGameContainer}>
          <Text style={styles.yourNumber}>Your Number</Text>
          <NumberContainer>{this.state.selectedNumber}</NumberContainer>
          <View>
            <MainButton
              onPress={this.props.startGame.bind(
                this,
                this.state.selectedNumber
              )}
            >
              Start Game
            </MainButton>
          </View>
        </Card>
      );
    }
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.screen}>
              <Text style={styles.title}>Start Game!</Text>
              <Card style={styles.inputContainer}>
                <TitleText>Select a number</TitleText>
                <Input
                  autoFocus={false}
                  blurOnSubmit
                  autoCorrect={false}
                  keyboardType="numeric"
                  maxLength={2}
                  style={styles.input}
                  onChangeText={this.inputTextChangeHandler}
                  value={this.state.inputTextValue}
                />
                <View style={styles.buttonContainer}>
                  <View style={{ width: this.state.buttonWidth }}>
                    <Button
                      color={color.secondary}
                      onPress={this.resetTextHandler}
                      title="Reset"
                    />
                  </View>
                  <View style={{ width: this.state.buttonWidth }}>
                    <Button
                      title="Confirm"
                      onPress={this.confirmTextHandler}
                      color={color.primary}
                    />
                  </View>
                </View>
              </Card>
              {confirmOutput}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  yourNumber: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  startGameContainer: {
    width: "50%",
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartGameScreen;
