import React from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  // returns a promise

  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

class App extends React.Component {
  state = {
    userNum: undefined,
    guessRounds: 0,
    loadingFonts: false,
  };

  updateGuessRoundHandler = (updatedRound) => {
    this.setState({ guessRounds: updatedRound });
  };

  startGameHandler = (selectedNum) => {
    this.setState({ userNum: selectedNum });
  };

  restartGameHandler = () => {
    this.setState({ userNum: undefined, guessRounds: 0 });
  };
  render() {
    if (!this.state.loadingFonts) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => this.setState({ loadingFonts: true })}
          onError={(err) => console.log(err)}
        />
      );
    }
    return (
      <View style={styles.screen}>
        <Header title="Guess a number" />
        {this.state.userNum && this.state.guessRounds <= 0 ? (
          <GameScreen
            userChoice={this.state.userNum}
            updateRounds={this.updateGuessRoundHandler}
          />
        ) : this.state.guessRounds > 0 ? (
          <GameOverScreen
            totalRounds={this.state.guessRounds}
            userNumber={this.state.userNum}
            restartGame={this.restartGameHandler}
          />
        ) : (
          <StartGameScreen startGame={this.startGameHandler} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default App;
