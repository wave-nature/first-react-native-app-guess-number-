import React, { Component, createRef } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/UI/Card";

const generateRandomBetween = function (min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);

  const random = Math.floor(Math.random() * (max - min)) + min; //gives random num between min and max

  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNum: generateRandomBetween(1, 100, this.props.userChoice),
      rounds: 0,
    };

    this.lowerValue = createRef();
    this.lowerValue.current = 1;
    this.higherValue = createRef();
    this.higherValue.current = 100;
  }

  componentDidUpdate(prevProp, prevState) {
    const { updateRounds } = this.props;
    if (this.state.rounds !== prevState.rounds) {
      if (this.state.randomNum === this.props.userChoice) {
        updateRounds(this.state.rounds);
      }
    }
  }

  nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && this.state.randomNum < this.props.userChoice) ||
      (direction === "greater" && this.state.randomNum > this.props.userChoice)
    ) {
      Alert.alert("You just lied", "Please use your mind!", [
        { text: "Close", style: "cancel" },
      ]);

      return;
    }
    if (direction === "lower") {
      this.higherValue.current = this.state.randomNum;
    } else this.lowerValue.current = this.state.randomNum;

    const nextGuess = generateRandomBetween(
      this.lowerValue.current,
      this.higherValue.current,
      this.state.randomNum
    );

    this.setState((prevState) => ({
      randomNum: nextGuess,
      rounds: prevState.rounds + 1,
    }));
  };
  render() {
    return (
      <View style={styles.screen}>
        <Text>Computer Guess</Text>
        <NumberContainer>{this.state.randomNum}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <Button
            onPress={this.nextGuessHandler.bind(this, "lower")}
            title="Lower"
          />
          <Button
            onPress={this.nextGuessHandler.bind(this, "greater")}
            title="Greater"
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
